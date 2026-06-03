import { Schema, model } from "mongoose";

const applicationSchema = new Schema({

    studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    companyId: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },

    status: {
        type: String,
        default: "Applied"
    },

    round: {
        type: String,
        default: "Round 1"
    },

    appliedDate: {
        type: Date,
        default: Date.now
    }

},
{
    versionKey: false
});

export const applicationModel= model("Application", applicationSchema);

export default applicationModel;