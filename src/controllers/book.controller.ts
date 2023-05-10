import express from 'express';
import {v2 as cloudinary} from 'cloudinary';

import Book from '../models/Book.model';

// Create Function, will be used via POST
async function createBook(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const {title} = req.body;
    const userId = req.user.id;

    try {
        const thumbnail = cloudinary.url(req.file.filename);
        const book = await Book.create({title, owner: userId, thumbnail});
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
}

// Update Function, will be used via PATCH, with ID in path
async function updateBook (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const {bookId} = req.params;
    const {title, pages} = req.body;
    const userId = req.user.id;

    let thumbnail;
    if (req.file) {
        thumbnail = cloudinary.url(req.file.filename);
    }

    try {
        const book = await Book.findById(bookId);

        if (!book.owner.equals(userId)) {
            res.status(403).json({message: 'Cannot modify someone elses book'});
            return;
        }
        
        if (title) book.title = title;
        if (thumbnail) book.thumbnail = thumbnail;
        if (pages) book.pages = pages;

        book.save();
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
}

// Delete function, will be used via POST, with ID in path
async function deleteBook (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const {bookId} = req.params;
    const userId = req.user.id;

    try {
        await Book.findByIdAndDelete(bookId, {owner: userId});
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

// Read function, will be used via GET, with ID in path
async function getBook (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const {bookId} = req.params;
    const userId = req.user.id;

    try {
        const book = await Book.find({_id: bookId, owner: userId});
        res.json(book);
    } catch (error) {
        next(error);
    }
}

// Read All function, will be used via GET
async function getAllBooks (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
        const userId = req.user.id;
        const books = await Book.find({owner: userId});
        res.json(books);
    } catch (error) {
        next(error);
    }
}

const bookController = {
    createBook,
    updateBook,
    deleteBook,
    getBook,
    getAllBooks,
};

export default bookController;