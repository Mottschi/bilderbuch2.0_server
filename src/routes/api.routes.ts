import express from 'express';

import authMiddleware from '../middleware/auth.middleware';
import fileUploaders from '../config/cloudinary.config';

import bookController from '../controllers/book.controller';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('called /');
    res.send('hello api');
});

// For the actual book, a full CRUD is required
router.get('/book', authMiddleware.isAuthenticated, bookController.getAllBooks);

router.get('/book/:bookId', authMiddleware.isAuthenticated, bookController.getBook);

router.post('/book', authMiddleware.isAuthenticated, fileUploaders.imageUploader.single('imageUrl'), bookController.createBook);

router.patch('/book/:bookId', authMiddleware.isAuthenticated, fileUploaders.imageUploader.single('imageUrl'), bookController.updateBook);

router.delete('/book/:bookId', authMiddleware.isAuthenticated, bookController.deleteBook);

export default router;
