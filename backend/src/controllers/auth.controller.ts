import { Request, Response } from "express";
import { getRepository, MoreThanOrEqual } from "typeorm";
import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import { sign, verify} from "jsonwebtoken";
import { Token } from "../models/token.entity";

interface IUser {
  first_name: string,
  last_name: string,
  email: string,
  password?: string
}

const access_secret: string = process.env.ACCESS_SECRET || "";
const refresh_secret: string = process.env.REFRESH_SECRET || "";

class AuthController {


  async Register(req: Request, res: Response) {
    const { first_name, last_name, email, password, password_confirm } = req.body;

    if (password !== password_confirm) {
      return res.status(400).send({ message: "Passwords do not match!" });
    }

    const salt = bcryptjs.genSaltSync(12);
    const passwordEncrypted = bcryptjs.hashSync(password,salt)

    const user :IUser = await getRepository(User).save({
      first_name,
      last_name,
      email,
      password: passwordEncrypted
    });

    delete user.password;

    res.send(user)
  }

  async Login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user :any = await getRepository(User).findOne({
      email
    });

    if (!user) {
      return res.status(400).send(
        { message: "Invalid Credentials" }
      );
    }

    const matched = bcryptjs.compareSync(password, user.password);
    if (!matched) {
      return res.status(400).send(
        { message: "Invalid Credentials" }
      );
    }

    const payload = {
      id: user.id
    };

    const refreshToken = sign(payload, refresh_secret, { expiresIn: "1w" });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const expired_at = new Date();

    expired_at.setDate(expired_at.getDate() + 7);

    await getRepository(Token).save({
      user_id: user.id,
      token: refreshToken,
      expired_at
    })

    const token = sign(payload, access_secret, { expiresIn: "30s" });

    res.status(200).send({ token });
  }

  async AuthenticatedUser(req: Request, res: Response) {

    try {
      const accessToken = req.header("Authorization")?.split(" ")[1] || '';

      const payload :any = verify(accessToken, access_secret);

      if (!payload) {
        return res.status(401).send({
          message: "unauthenticated"
        });
      }

      const user :any = await getRepository(User).findOne(payload.id);
      if (!user) {
        return res.status(401).send({
          message: "unauthenticated"
        });
      }
        
      const {password, ...data} = user
        
      res.send(data);

    } catch (error) {
      return res.status(401).send({
        message: "unauthenticated"
      });     
    }
  }

  async Refresh(req: Request, res: Response) {
    try {
      const cookie = req.cookies["refresh_token"];

      const payload: any = verify(cookie, refresh_secret);

      if (!payload) {
        return res.status(401).send({
          message: "unauthenticated"
        });
      }

      const refreshToken = await getRepository(Token).findOne({
        user_id: payload.user_id,
        expired_at: MoreThanOrEqual(new Date())
      })

      if (!refreshToken) {
        return res.status(401).send({
          message: "unauthenticated"
        });
      }

      const user :any = await getRepository(User).findOne(payload.id);
      if (!user) {
        return res.status(401).send({
          message: "unauthenticated"
        });
      }

      const token = sign({id: payload.id}, access_secret, { expiresIn: "30s" });

      res.status(200).send({ token });

    } catch (error) {
      return res.status(401).send({
        message: "unauthenticated"
      });     
      
    }
  }

  async Logout(req: Request, res: Response) {

    await getRepository(Token).delete({
      token: req.cookies["refresh_token"]
    });

    res.cookie("refresh_token", "", { maxAge: 0 });

    res.status(200).send({ message: "Success" });
  }

}

export { AuthController }