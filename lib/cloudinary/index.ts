import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (
    fileBuffer: Buffer,
    fileName: string
): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "images",
                public_id: fileName.split(".")[0],
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) {
                    return reject(error);
                }
                if (result) {
                    resolve(result.secure_url);
                } else {
                    reject(new Error("Upload failed, result is undefined"));
                }
            }
        );

        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);
        bufferStream.pipe(uploadStream);
    });
};
