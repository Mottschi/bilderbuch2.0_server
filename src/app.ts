import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import db from './db/db';

import indexRouter from './routes/index.routes';

import errorHandlers from './error-handling/error-handling';

dotenv.config();

const app = express();

const FRONTEND_URL = process.env.ORIGIN || 'http://localhost:3000';

db.connect();

app.use(cors({ origin: [FRONTEND_URL] }));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(indexRouter);

app.use(errorHandlers.notFound);
app.use(errorHandlers.errorHandler);

export default app;
