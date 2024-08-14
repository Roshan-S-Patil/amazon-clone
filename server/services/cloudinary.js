import cloudinary from "cloudinary"
import dotenv from "dotenv"
dotenv.config()
import fs from "fs"

 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});


const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath)return null
        //upload File
        const response=await cloudinary.v2.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the uplod operation failed
    }
}

export {uploadOnCloudinary}