import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload an image
const uploadOnCloudinary = async (localFilePath,type) => {
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader
        .upload(
            localFilePath,{
                folder:type==="video"?"videos":"images",
                resource_type:type
            }
        );
        fs.unlinkSync(localFilePath);
        return response.url;
    } catch (error) {
        console.log("Error while uploading on cloudinary",error.message);
        fs.unlinkSync(localFilePath);
        return null;
    }
};

const deleteFromCloudinary = async(publicId) =>{
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Deleted from cloudinary. Public Id ",publicId);
    } catch (error) {
        console.log("Error deleting from cloudinary",error);
        return null;
    }
};

export {uploadOnCloudinary, deleteFromCloudinary};