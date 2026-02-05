import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Resume} from "../models/resume.model.js"
import {uploadOnCloudinary, deleteOnCloudinary} from "../utils/cloudnary.js"
import {extractResumeText} from "../utils/extractResumeText.js"
import fs from "fs"
import {Job} from "../models/jobMatch.model.js"
import { isValidObjectId } from 'mongoose'


const uploadResume = asyncHandler( async(req, res)=>{
   const localpath = req.file?.path
    
    if(!localpath){
       throw new ApiError(400, "Resume files is required")
    }

    const resumeText = await extractResumeText(localpath);

    if(!resumeText){
       throw new ApiError(400, "Text extration failed")
        fs.unlinkSync(localpath)
    }

    const cloudinaryRes = await uploadOnCloudinary(localpath);

    if(!cloudinaryRes){
       new ApiError(400, "Upload file failed")
    }

    const resume = await Resume.create({
        owner: req.user?._id,
        fileName: req.file.originalname,
        fileUrl: {
            public_id: cloudinaryRes.public_id,
            url: cloudinaryRes.url
        },
        textContent: resumeText,
        status: "uploaded"
    })

    if(!resume){
        throw new ApiError(500, "Resume uploading failed")
    }

    return res.status(200)
            .json(new ApiResponse(200, resume, "Resume upload sucessfully"))
})

const getAllResume = asyncHandler( async(req, res)=>{
   const userId =  req.user?._id

   if(!isValidObjectId(userId)){
       throw new ApiError(400, "Invalid ID")
   }

   const allResume = await Resume.find({owner: userId})

   if(!allResume){
      throw new ApiError(404, "Resumes not found")
   }

   return res.status(200)
             .json(new ApiResponse(200, allResume, "Resumes get successfully"))

})

const deleteResume = asyncHandler( async(req, res)=>{
   const { resumeId } = req.params

   const resume = await Resume.findOne({
    _id: resumeId,
    owner: req.user._id
   })

   if(!resume){
       throw new ApiError(404, "Resume not found")
   }

   await deleteOnCloudinary(resume.fileUrl.public_id)
   // console.log(isResumeDelete) // undefined

   await Job.deleteMany({
    owner: req.user._id,
    resume: resumeId
   })

   await resume.deleteOne()

   return res.status(200)
             .json(new ApiResponse(200, {}, "Resume deleted successfully"))
})


export {
    uploadResume,
    deleteResume,
    getAllResume
}
