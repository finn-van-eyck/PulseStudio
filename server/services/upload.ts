import { v2 as cloudinary } from "cloudinary";
import { Request } from "express";
import multer from "multer";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer opslaan in geheugen (niet op disk)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

export async function uploadToCloudinary(buffer: Buffer, filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "pulsestudio", public_id: filename },
            (error, result) => {
                if (error) reject(error);
                else resolve(result!.secure_url);
            }
        ).end(buffer);
    });
}