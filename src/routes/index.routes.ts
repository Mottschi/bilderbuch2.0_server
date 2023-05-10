import express from 'express';

import authRouter from './auth.routes';
import apiRouter from './api.routes';

import Book from '../models/Book.model';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('called /');
    res.send('hello');
});

router.get('/book', async (req, res, next) => {
    try {
        const book = await Book.create({
            title: 'test book',
            thumbnail: 'none',
            pages: [
                { number: 1, text: 'foo', picture: 'asd' },
                { number: 2, text: 'bar', picture: 'dfgn' },
            ],
        });
        console.log('book', book);
        res.json(book);
    } catch (error) {
        next(error);
    }
});

router.use('/auth', authRouter);

router.use('/api', apiRouter);

export default router;
