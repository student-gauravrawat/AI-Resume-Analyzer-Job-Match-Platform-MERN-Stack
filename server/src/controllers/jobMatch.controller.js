import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js "
import {asyncHandler} from "../utils/asyncHandler.js"
import {Job} from "../models/jobMatch.model.js"
import {Resume} from "../models/resume.model.js"
import { detectRole } from "../utils/detectRole.js";
import { getRoleSkills } from "../utils/getRoleSkills.js";
import { skillMatch } from "../utils/skillMatch.js";
import {generateSuggestions} from "../utils/aiService.js";


const matchResumeWithJob = asyncHandler( async(req, res)=>{
   const { resumeId, jobDescription } = req.body; //? Rest principle... (Golden Rule)
                                                  //*  we should use params for taking id but when we want to identify resource.  
                                                  //*  But we want to perform any action for data so we can can take id from body. 
   const userId = req.user?._id

   if(!resumeId || !jobDescription){
       throw new ApiError(400, "Resume ID and Job Description are required")
   }

   const resume = await Resume.findOne({
    _id: resumeId,
    owner: userId
   })

   if(!resume){
       throw new ApiError(400, "Resume not found")
   }

   const role = detectRole(jobDescription)

   if(role === "unknown"){
      throw new ApiError(400, "Unable to detect job role")
   }

   console.log(role)
   const roleSkills = getRoleSkills(role)

   if(roleSkills.length === 0){
       throw new ApiError(400, "Unable to detect job role skills from resume ")
   }
    
   const analysis = skillMatch(
     resume.textContent,
     jobDescription,
     roleSkills
   )
 
   if(!analysis){
      throw new ApiError(400, "job and resume analysis failed")
   }
  console.log(analysis)
   if(!resume.skills || resume.skills.length === 0) {
      resume.skills = analysis.resumeSkills;
      resume.status = "analyzed";
      await resume.save();
   }

   const aiSuggestion = await generateSuggestions({
    role,
    missingSkills: analysis.missing,
    score: analysis.score,
    resumeText: resume.textContent
   })

   if(!aiSuggestion){
     throw new ApiError(500, "AI suggestion not created")
   }

   const jobMatch = await Job.create({
    owner: userId,
    resume: resumeId,
    jobRole: role,
    jobDescription: jobDescription,
    matchedSkills: analysis.matched,
    missingSkills: analysis.missing,
    score: analysis.score,
    suggestions: aiSuggestion.split("\n")
   })

   if(!jobMatch){
      throw new ApiError(500, "Job Match Failed")
   }

   return res.status(200)
             .json(new ApiResponse(200, jobMatch, "Job Match Successfull"))

})

const getJobMatchHistory = asyncHandler( async(req, res)=>{
   const userId = req.user?._id

   if (!userId) {
      throw new ApiError(401, "Unauthorized access");
   }

   const jobs = await Job.find({owner: userId})
        .populate("resume", "fileName")
        .sort({createdAt: -1})

    return res.status(200)
              .json(new ApiResponse(200, jobs, jobs.length ? "Job match history fetched" : "No job match history found"))
   
})

const getSingleJobMatch = asyncHandler(async (req, res) => {
  const {jobMatchId} = req.params

  const job = await Job.findOne({
    _id: jobMatchId,
    owner: req.user._id
  }).populate("resume");

  if (!job) {
    throw new ApiError(404, "Job match not found");
  }

  res.status(200).json(
    new ApiResponse(200, job, "Job match fetched")
  );
});

export {
    matchResumeWithJob,
    getJobMatchHistory,
    getSingleJobMatch

}