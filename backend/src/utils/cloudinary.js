import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: "de2z55xdt", 
    api_key: "366356674838559", 
    api_secret: "0BW-xr08xFmlFV1Aik_2kiHRP98"
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log(process.env.CLOUDINARY_CLOUD_NAME);
        console.log(process.env.CLOUDINARY_API_KEY);
        console.log(process.env.CLOUDINARY_CLOUD_NAME);
        
        if (!localFilePath) return null;

        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "raw"
        })

        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        // fs.unlinkSync(localFilePath) // remove locally saved file
        console.log(error);
        
        return null;
    }
}