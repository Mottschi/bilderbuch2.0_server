import express from "express";
import cors from "cors";

import db from './db/db'
import router from './routes/index.routes'

const app = express();

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

db.connect()

app.use(cors({
    origin: [FRONTEND_URL]
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(router)

export default app;