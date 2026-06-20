import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    companyName: {
      type: String,
      default: ""
    },

    type: {
      type: String,
      default: ""
    },

    message: {
      type: String,
      required: true
    },

    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model(
  "Notification",
  notificationSchema
);