import exp from 'express';
import {config} from 'dotenv';
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import studentApp from "./APIs/studentAPI.js";
import adminApp from "./APIs/adminAPI.js";

import cors from 'cors'
config();

// CREATE 

//create express app
const app=exp();
//enable cors
app.use(cors())
//add cookie parser middleware
app.use(cookieParser())

//body parser middleware
app.use(exp.json());
app.use("/students", studentApp);
app.use("/admin", adminApp);



//connect to db
const connectDb=async()=>{
  try{
    await connect(process.env.DB_URL);
    console.log("DB server connected");
    //assign port
    const port=process.env.PORT || 4000;
    app.listen(port,()=>console.log(`server listening to ${port}..`));
  }catch(err){
        console.log("error in db connect",err);
    }
};


connectDb();

//to handle invalid path
app.use((req,res,next)=>{
  console.log(req.url);
  res.status(404).json({ message:`path ${req.url} is invalid`});
})

//Error handling middleware
app.use((err, req, res, next) => {
  console.log("error is ",err)
  console.log("Full error:", JSON.stringify(err, null, 2));
  //ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  //CastError
  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  //send server side error
  res.status(500).json({ message: "error occurred", error: "Server side error" });
});