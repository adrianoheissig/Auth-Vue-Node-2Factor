require("dotenv").config();

import express, { Request, Response } from "express";

import { createConnection } from "typeorm";
import { router } from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";

createConnection().then(() => {
  const app = express();
  
  //Toda vez que enviar um request, será convertido para JSON
  app.use(express.json());

  app.use(cookieParser());

  app.use(cors({
    origin: ["http://localhost:8080", "http://localhost:8081"],
    credentials: true
  }))

  app.use(router)
  
  app.listen(3333, () => { console.log("Listen on port 3333") });
})
