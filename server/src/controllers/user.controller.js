import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {sendemail} from "../utils/sendEmail.js"
import {generateOtp} from "../utils/generateOtp.js"
import {User} from "../models/user.model.js"
import {Job} from "../models/jobMatch.model.js"
import {Resume} from "../models/resume.model.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken;

        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const register = asyncHandler( async(req, res)=>{
     const {fullName, email, username, password, role} = req.body

     if([fullName, email, username, password, role].some((field)=> !field || field.trim() === "")){
        throw new ApiError(400, "All fields are required")
     }

     if(email.endsWith("@gamil.com")){
        new ApiError(400, "Without @gamil.com email is not acceptable")
     }

     const existedUser = await User.findOne({
        $or: [
            {username},
            {email}
        ]
     })

     if(existedUser){
        throw new ApiError(409, "User with email or username already exit try different")
     }

     const profilePhoto = `https://api.dicebear.com/7.x/initials/svg?seed=${username}`

     const otp = generateOtp()

     const user = await User.create(
        {
            username,
            email,
            fullName,
            password,
            role,
            profilePhoto,
            emailOtp: otp,
            emailOtpExpiry: Date.now() + 10 * 60 * 1000 
        }
     )

     const createdUser = await User.findById(user._id).select("-password -refreshToken")

     if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
     }

     await sendemail(email, otp)

     return res.status(200)
               .json(new ApiResponse(200, createdUser, "Account register sucessfully. OTP has been sent to your email."))

})

const verifyEmail = asyncHandler( async(req, res)=>{
    const {email, otp} = req.body

    if([email, otp].some((field)=> !field || field.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({email})

    if(!user){
       throw new ApiError(400, "User is not found")
    }

    if(user.emailVerified){
       throw new ApiError(400, "Email is already verified")
    }

    if(otp !== user.emailOtp){
       throw new ApiError(400, "Invalid OTP")
    }

    if(user.emailOtpExpiry < Date.now()){
       throw new ApiError(400, "OTP Expired")
    }

    user.emailVerified= true
    user.emailOtp = undefined
    user.emailOtpExpiry = undefined

    await user.save()

    return res.status(200)
              .json(new ApiResponse(200, {},"Email verified sucessfully"))

})

const resendOtp = asyncHandler( async(req, res)=>{
  const {email} = req.body

  if(!email){
    throw new ApiError(400, "Email is required")
  }

  const user = await User.findOne({email})

  if(!user){
     throw new ApiError(400, "User is not found")
  }

  if(user.emailVerified){
     throw new ApiError(400, "Email is already verified")
  }

  const otp = generateOtp()

  user.emailOtp = otp
  user.emailOtpExpiry = Date.now() + 10 * 60 * 1000

  await user.save()
  sendemail(email, otp)

  return res.status(200)
            .json(new ApiResponse(200, {}, "New OTP has been sent to your email"))
  
})

const login = asyncHandler( async(req, res)=>{
    const {username, email, password} = req.body

    if(!(username || email)){
       throw new ApiError(400, "username or email is required")
    }

    if(!password){
       throw new ApiError(400, "Password is required")
    }

    const user = await User.findOne({
        $or: [{email}, {username}]
    })

    if(!user){
      throw new ApiError(403, "User does not exists")
    }

    if(!user.emailVerified){
       throw new ApiError(403, "Please verify your email first")
    }

    const isPasswordvalid = await user.passwordCompare(password)

    if(!isPasswordvalid){
       throw new ApiError(401, "password is incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const totalResumes = await Resume.countDocuments({ owner: user._id });
    const totalJobMatches = await Job.countDocuments({ owner: user._id });

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    const option = {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }

    return res.status(200)
              .cookie("accessToken", accessToken, option)
              .cookie("refreshToken", refreshToken, option)
              .json(new ApiResponse(200, {
               loggedUser, 
               resumeCount: totalResumes,
               jobMatchCount: totalJobMatches
              }, "User loged in successfully"))

})

const logout = asyncHandler( async(req, res)=>{
      await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
      )

      const options = {
         httpOnly: true,
         secure: true
      }

      return res.status(200)
                .clearCookie("accessToken", options)
                .clearCookie("refreshtoken", options)
                .json(new ApiResponse(200, {}, "User logged Out"))
})

const passwordChange = asyncHandler( async(req, res)=>{
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)

    if(!user){
       throw new ApiError(400, "User not found")
    }

    const isPasswordCorrect = await user.passwordCompare(oldPassword)

    if(!isPasswordCorrect){
      throw new ApiError(400, "Old password is not correct")
    }

    user.password = newPassword
    await user.save()

    return res.status(200)
              .json(new ApiResponse(200, {}, "password changed sucessfully"))

})

const getUser = asyncHandler( async(req, res)=>{
   const userId = req.user._id
 
   const totalResumes = await Resume.countDocuments({ owner: userId });
   const totalJobMatches = await Job.countDocuments({ owner: userId });
   const loggedUser = await User.findById(userId).select("-password -refreshToken")

   return res.status(200)
             .json(new ApiResponse(200, {
               loggedUser,
               resumeCount: totalResumes,
               jobMatchCount: totalJobMatches
             }, "get user successfully"))

})

const refreshAccessToken = asyncHandler( async(req, res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
       throw new ApiError(401, "Unauthorizd request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decodedToken?._id)

    if(!user){
        throw new ApiError(401, "Inavlid refresh token")
    }

    if(incomingRefreshToken !== user?.refreshToken){
       throw new ApiError(401, "Refresh token is expired or used")
    }

    const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)

    const option = {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    }

    return res.status(200)
              .json(new ApiResponse(200, {accessToken, refreshAccessToken: newRefreshToken}, "Access token refreshed"))

})

export {
    register,
    verifyEmail,
    resendOtp,
    login,
    logout,
    passwordChange,
    getUser,
    refreshAccessToken
}
