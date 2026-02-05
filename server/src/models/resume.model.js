import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: {
        public_id: String,
        url: String
    },
    required: true
  },
  textContent: {
    type: String
  },
  skills: [String],
  status: {
    type: String,
    enum: ["uploaded", "analyzed"],
    default: "uploaded"
  }

}, { timestamps: true})

export const Resume = mongoose.model("Resume", resumeSchema)