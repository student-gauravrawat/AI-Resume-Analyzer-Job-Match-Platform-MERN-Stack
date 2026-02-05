import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  owner: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: true
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  jobRole: {
    type: String,
    required: true,
    trim: true
  },
  matchedSkills: [String],
  missingSkills: [String],
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  suggestions: [String]

}, { timestamps: true})


export const Job = mongoose.model("Job", jobSchema)
