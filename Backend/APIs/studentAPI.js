import exp from "express";
import Student from "../models/studentModel.js";
import Application from "../models/applicationModel.js";
import Company from "../models/companyModel.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken.js";
import bcrypt from "bcryptjs";

const studentApp = exp.Router();

// GET all students
studentApp.get("/", async (req, res) => {

    const students = await Student.find();

    res.status(200).json({
        message: "Students fetched successfully",
        payload: students
    });

});

// REGISTER student
studentApp.post("/register", async (req, res) => {
if (
  req.body.role === "admin" &&
  req.body.secretCode !== "CAMPUSHIRE2026"
) {
  return res.status(401).json({
    message: "Invalid Admin Secret Code"
  });
}
  // hash password
const hashedPassword = await bcrypt.hash(
    req.body.password,
    10
);

// replace plain password
req.body.password = hashedPassword;
delete req.body.secretCode;
const newStudent = new Student(req.body); 

    const student = await newStudent.save();

   res.status(201).json({
    message:
      student.role === "admin"
        ? "Admin Registered Successfully"
        : "Student Registered Successfully",
    payload: student
});

});

// LOGIN
studentApp.post("/login", async (req, res) => {

    // check email
    const user = await Student.findOne({
        email: req.body.email
    });

    // user not found
    if (!user) {

        return res.status(404).json({
            message: "User not found"
        });

    }

    // check password
    const isMatched = await bcrypt.compare(
    req.body.password,
    user.password
);

if (!isMatched) {

    return res.status(401).json({
        message: "Invalid password"
    });

}

// check role
if (user.role !== req.body.role) {

return res.status(401).json({
    message: `This account is not registered as ${req.body.role}`
});


}


    // generate token
    const token = jwt.sign(

        {
            id: user._id,
            role: user.role
        },

        process.env.SECRET_KEY,

        {
            expiresIn: "1d"
        }

    );

    // send token in cookie
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
   const userObj = user.toObject();

delete userObj.password;
    // response
    res.status(200).json({

        message: "Login successful",

        payload: {
    user: userObj,
    token
}

    });

});

// APPLY FOR COMPANY
studentApp.post("/apply", verifyToken("student"), async (req, res) => {

    const existingApplication = await Application.findOne({
        studentId: req.body.studentId,
        companyId: req.body.companyId
    });

    if (existingApplication) {
        return res.status(400).json({
            message: "Already applied for this company"
        });
    }

    const application = await Application.create(req.body);

    res.status(201).json({
        message: "Applied successfully",
        payload: application
    });

});

// GET ALL APPLICATIONS
studentApp.get("/applications/:studentId", verifyToken("student"), async (req, res) => {

    const applications = await Application.find({
        studentId: req.params.studentId
    })
    .populate("companyId");

    res.status(200).json({
        message: "Applications fetched successfully",
        payload: applications
    });

});

// GET ELIGIBLE COMPANIES
studentApp.get("/eligible-companies/:id", verifyToken("student"),async (req, res) => {

    // get student
    const student = await Student.findById(req.params.id);

    // filter companies
   const companies = await Company.find({
    minCGPA: { $lte: student.cgpa }
});

    res.status(200).json({

        message: "Eligible companies fetched successfully",

        payload: companies

    });

});

// GET single student
studentApp.get("/:id", async (req, res) => {

    const student = await Student.findById(req.params.id);

    res.status(200).json({
        message: "Student fetched successfully",
        payload: student
    });

});


// UPDATE student
studentApp.put("/:id", async (req, res) => {

    const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json({
        message: "Student Updated Successfully",
        payload: updatedStudent
    });

});


// DELETE student
studentApp.delete("/:id", async (req, res) => {

    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "Student Deleted Successfully"
    });

});

studentApp.get(
  "/dashboard-stats/:id",
  verifyToken("student"),
  async (req, res) => {

    const studentId = req.params.id;

    const student =
      await Student.findById(studentId);

    const eligibleCompanies =
  await Company.countDocuments({
    minCGPA: { $lte: student.cgpa }
  });

    const applications =
      await Application.countDocuments({
        studentId
      });

    const selected =
      await Application.countDocuments({
        studentId,
        status: "Selected"
      });

    res.status(200).json({
      payload: {
        eligibleCompanies,
        applications,
        selected
      }
    });

  }
);

export default studentApp;