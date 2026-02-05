import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
   fullName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
   },
   email: {
     type: String,
     required: true,
     trim: true,
     lowercase: true,
     unique: true,
     lowercase: true 
   },
   username: {
     type: String,
     required: true,
     trim: true,
     lowercase: true,
     unique: true,
     lowercase: true 
   },
   password: {
     type: String,
     required: [true, "Password is required"],
     trim: true
   },
   profilePhoto:{
     type: String,
     default: ""
   },
   role:{
     type: String,
     enum: ["user", "admin"],
     reuired: true
   },
   emailVerified: {
     type: Boolean,
     default: false
   },
   emailOtp: {
     type: String
   },
   emailOtpExpiry: {
     type: Date
   },
   refreshToken: {
     type: String
   }
    
},{timestamps: true})


userSchema.pre("save", async function(){
   if(!this.isModified("password")) return;
   try {
     this.password  = await bcrypt.hash(this.password, 15)
   } catch (error) {
     throw error
   }
})

userSchema.methods.passwordCompare = async function(password){
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
   return jwt.sign(
      {
        _id : this._id,
        username: this.username,
        fullName: this.fullName,
        email: this.email
      },
        process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
   )
}

userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id: this._id
    },
      process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.RFRESH_TOKEN_EXPIRY
    }
   )
}

export const User = mongoose.model("User", userSchema)