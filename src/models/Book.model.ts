import mongoose from 'mongoose';
import User from './User.model';

const bookSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: [true, 'Book needs a User reference'],
        },
        title: {
            type: String,
            required: [true, 'Book title is required.'],
        },
        thumbnail: {
            type: String,
            required: [true, 'URL for thumbnail is required.'],
            unique: false,
        },
        pages: {
            type: [
                {
                    type: {
                        text: { type: String },
                        picture: { type: String },
                    },
                },
            ],
            default: [],
            required: true,
        },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    },
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
