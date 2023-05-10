import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();
 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});
 
const imageStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            allowed_formats: ['jpg', 'png', 'gif'],
            folder: 'bilderbuch/images',
        };
    },
});
 
export const imageUploader = multer({ storage: imageStorage });

const videoStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            // allowed_formats: ['jpg', 'png', 'gif'],
            folder: 'bilderbuch/video',
            resource_type: 'video',
        };
    },
});

export const videoUploader = multer({ storage: videoStorage });

const rawStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            // allowed_formats: ['jpg', 'png', 'gif'],
            folder: 'bilderbuch/raw',
            resource_type: 'raw',
        };
    },
});

export const rawUploader = multer({ storage: rawStorage });

export default {rawUploader, imageUploader, videoUploader};