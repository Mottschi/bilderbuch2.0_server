import express from 'express';

import authMiddleware from '../middleware/auth.middleware';
import fileUploaders from '../middleware/aws.middleware';

import bookController from '../controllers/book.controller';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello api');
});

// For the actual book, a full CRUD is required
router.get('/book', authMiddleware.isAuthenticated, bookController.getAllBooks);

router.get('/book/:bookId', authMiddleware.isAuthenticated, bookController.getBook);

router.post('/book', authMiddleware.isAuthenticated, fileUploaders.imageUploader, bookController.createBook);

router.patch('/book/:bookId', authMiddleware.isAuthenticated, fileUploaders.imageUploader, bookController.updateBook);

router.delete('/book/:bookId', authMiddleware.isAuthenticated, bookController.deleteBook);

export default router;
