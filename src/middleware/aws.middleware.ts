import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import mime from 'mime-types';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

dotenv.config();

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_BUCKET = process.env.AWS_BUCKET;
const AWS_REGION = process.env.AWS_REGION;

const AWS_OPTIONS = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
};


// create AWS client
const s3Client = new S3Client(AWS_OPTIONS);

// Configure multer middleware for handling file uploads
const imageUploader = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: AWS_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const folder = `${req.user.id}/images`;
            const name = crypto.randomUUID();
            const suffix = mime.extension(file.mimetype);
            cb(null, `${folder}${folder?'/':''}${name}.${suffix}`);
        },
    }),
}).single('image');

const recordingUploader = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: AWS_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const folder = `${req.user.id}/recordings`;
            const name = crypto.randomUUID();
            const suffix = mime.extension(file.mimetype);
            cb(null, `${folder}${folder?'/':''}${name}.${suffix}`);
        },
    }),
}).single('recording');

async function deleteObject(file: string) {
    const key = file.substring(file.indexOf('.com/') + 5);
    const command = new DeleteObjectCommand({Bucket: AWS_BUCKET, Key: key});
    try {
        const result = await s3Client.send(command);
    } catch (error) {
        console.error(error);
    }
}

export default {recordingUploader, imageUploader, deleteObject};