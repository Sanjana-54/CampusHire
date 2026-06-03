import exp from "express";
import Student from "../models/studentModel.js";
import Company from "../models/companyModel.js";
import Application from "../models/applicationModel.js";
import {verifyToken}  from "../middlewares/verifyToken.js";

const adminApp = exp.Router();


// GET all students
adminApp.get("/students", verifyToken("admin"),async (req, res) => {

    const students = await Student.find();

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


export default adminApp;