import { Schema, model } from "mongoose";

const companySchema = new Schema({

    companyName:{
        type:String,
        required:true
    },
role: {
  type: String,
  required: true
},
location: {
  type: String,
  required: true
},
lastDateToApply: {
  type: String,
  required: true
},

    minCGPA:{
        type:Number
    },

    allowedBranches:[String],

    package:{
        type:String
    },

    driveDate:{
        type:String
    }
},
{
   versionKey:false
});

export const companyModel = model("Company", companySchema);

export default companyModel;