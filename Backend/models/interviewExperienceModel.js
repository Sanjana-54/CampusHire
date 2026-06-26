import { Schema, model } from "mongoose";

const interviewExperienceSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    rounds: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    tips: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("InterviewExperience",interviewExperienceSchema);