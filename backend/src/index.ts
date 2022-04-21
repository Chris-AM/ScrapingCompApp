import express, { Request, Response } from "express";
import mysql from "mysql2";

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
