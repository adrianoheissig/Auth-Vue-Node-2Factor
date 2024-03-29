import { Request, Response } from "express";
import { createTransport } from "nodemailer";
import { getRepository } from "typeorm";
import { Reset } from "../models/reset.entity";
import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";

const transporter = createTransport({
  host: '0.0.0.0',
  port: 1025
})

export const ForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const token = Math.random().toString(20).substring(2, 12);

  await getRepository(Reset).save({
    email,
    token
  })

  const url = `http://localhost:3000/reset/${token}`

  await transporter.sendMail({
    from: "from@example.com",
    to: email,
    subject: "Reset your password",
    html: `Click <a href="${url}">here</a> to reset your password!`
  })

  res.send({
    message: "Please check your email"
  });
}

export const ResetPassword = async (req: Request, res: Response) => {

  const { token, password, password_confirm } = req.body;

    if (password !== password_confirm) {
      return res.status(400).send({ message: "Passwords do not match!" });
    }
  
  const resetPassword = await getRepository(Reset).findOne({ token });

  if (!resetPassword) {
      return res.status(400).send({ message: "Invalid Link!" });
  }

  const user = await getRepository(User).findOne({ email: resetPassword.email });

  if (!user) {
      return res.status(400).send({ message: "User not found!" });
  }

  const salt = bcryptjs.genSaltSync(12);
  const passwordEncrypted = bcryptjs.hashSync(password,salt)

  await getRepository(User).update(user.id, {
    password: passwordEncrypted
  })

  return res.status(200).send({
    message: "Success"
  });
  
}