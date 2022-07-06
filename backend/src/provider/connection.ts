import { createConnection } from "typeorm";


export const connection =  createConnection()
  .then(() => {
  console.log("Conectado no banco de dados")
  })
  .catch(err => {
    throw new Error(err)
  })