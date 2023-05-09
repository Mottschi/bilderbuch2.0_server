import express from "express";
import cors from "cors";
import dotenv from "dotenv"


import db from './db/db'
import indexRouter from './routes/index.routes'

dotenv.config()

const app = express();

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

db.connect()

app.use(cors({
    origin: [FRONTEND_URL]
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(indexRouter)

export default app;