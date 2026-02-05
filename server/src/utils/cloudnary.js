import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

export const uploadOnCloudinary = async(localfilePath)=>{
   try {
     if(!localfilePath) return null;
     const response = await cloudinary.uploader.upload(localfilePath, {
        resource_type: "raw"
     })
     fs.unlinkSync(localfilePath)
     return response

   } catch (error) {
     fs.unlinkSync(localfilePath)
   }
}

export const deleteOnCloudinary = async(public_id, resource_type="raw")=>{
    try {
        if(!public_id) return null;
        const response = await cloudinary.uploader.destroy(public_id, {
            resource_type:`${resource_type}`
        })

    } catch (error) {
        console.log("Error:", error?.message)
    }
}
