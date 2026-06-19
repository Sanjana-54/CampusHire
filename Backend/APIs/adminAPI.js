import exp from "express";
import Student from "../models/studentModel.js";
import Company from "../models/companyModel.js";
import Application from "../models/applicationModel.js";
import {verifyToken}  from "../middlewares/verifyToken.js";

const adminApp = exp.Router();


// GET all students
adminApp.get("/students", verifyToken("admin"),async (req, res) => {

    const students = await Student.find({ role: "student" });

    res.status(200).json({
        message: "All students fetched successfully",
        payload: students
    });

});


// ADD company 
adminApp.post("/add-company", verifyToken("admin"),async (req, res) => {

    const company = await Company.create(req.body);

    res.status(201).json({
        message: "Company added successfully",
        payload: company
    });

});


// GET all companies
adminApp.get("/companies", verifyToken("admin"),async (req, res) => {

    const companies = await Company.find();

    res.status(200).json({
        message: "Companies fetched successfully",
        payload: companies
    });

});

adminApp.get(
  "/eligible-students/:companyId",
  async (req, res) => {

    console.log("Eligible route hit");

    try {

      const company = await Company.findById(
        req.params.companyId
      );

      console.log(company);

      const students = await Student.find({
        cgpa: {
          $gte: company.minCGPA
        },
        branch: {
          $in: company.allowedBranches
        }
      });

      res.status(200).json({
        message: "Eligible students fetched",
        payload: students
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Error fetching eligible students"
      });

    }

  }
);
// UPDATE company
adminApp.put("/company/:id", verifyToken("admin"),async (req, res) => {

    const updatedCompany = await Company.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json({
        message: "Company updated successfully",
        payload: updatedCompany
    });

});


// DELETE company
adminApp.delete("/company/:id", verifyToken("admin"),async (req, res) => {

    await Company.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "Company deleted successfully",
        payload: null
    });

});

// GET ALL APPLICATIONS
adminApp.get(
  "/applications",
  verifyToken("admin"),
  async (req, res) => {

    const applications = await Application.find()
      .populate("studentId")
      .populate("companyId");

    res.status(200).json({
      message: "Applications fetched successfully",
      payload: applications
    });

  }
);

// UPDATE APPLICATION STATUS
adminApp.patch("/update-status/:id", verifyToken("admin"),async (req, res) => {

    const updatedApplication =
        await Application.findByIdAndUpdate(

            req.params.id,
            req.body,
            { new: true }

        );

    res.status(200).json({
        message: "Application status updated successfully",
        payload: updatedApplication
    });

});

// UPDATE APPLICATION ROUND
adminApp.put(
  "/application-round/:id",
  verifyToken("admin"),
  async (req, res) => {

    const updatedApplication =
      await Application.findByIdAndUpdate(
        req.params.id,
        {
          round: req.body.round
        },
        {
          new: true
        }
      );

    res.status(200).json({
      message: "Application round updated successfully",
      payload: updatedApplication
    });

  }
);

adminApp.get(
"/dashboard-stats",
verifyToken("admin"),
async (req, res) => {


const totalStudents = await Student.countDocuments();

const totalCompanies = await Company.countDocuments();

const totalApplications =
  await Application.countDocuments();

const selectedStudents =
  await Application.countDocuments({
    status: "Selected"
  });

res.status(200).json({
  payload: {
    totalStudents,
    totalCompanies,
    totalApplications,
    selectedStudents
  }
});


}
);

adminApp.get(
  "/analytics",
  async (req, res) => {

    const totalStudents =
      await Student.countDocuments();

    const placedStudents =
      await Application.countDocuments({
        status: "Selected"
      });

    const placementPercentage =
      totalStudents > 0
        ? (
            (placedStudents / totalStudents) * 100
          ).toFixed(2)
        : 0;

    res.status(200).json({
      payload: {
        totalStudents,
        placedStudents,
        placementPercentage
      }
    });

  }
);

adminApp.get(
  "/application-analytics",
  verifyToken("admin"),
  async (req, res) => {

    const applied =
      await Application.countDocuments({
        status: "Applied"
      });

    const shortlisted =
      await Application.countDocuments({
        status: "Shortlisted"
      });

    const selected =
      await Application.countDocuments({
        status: "Selected"
      });

    const rejected =
      await Application.countDocuments({
        status: "Rejected"
      });

    res.status(200).json({
      payload: {
        applied,
        shortlisted,
        selected,
        rejected
      }
    });

  }
);

export default adminApp;