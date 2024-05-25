/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connection from "./config/connection.js";
connection();

import employee from './routes/employee.js'
import admin from './routes/admin.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", employee);
app.use("/admin", admin);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started At Port ${port}`));
