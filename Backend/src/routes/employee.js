const verifyJWT = require("../middlewares/verifyJWT");
const clientApp = require("../models/schema/clientApp");

const employeeSchema = require("../models/schema/employee")

const employee = require("express").Router();

employee.get("/", verifyJWT, async (req, res)=>{
    const employee_id = req.jwt_payload.id
    
    const employeeData = await employeeSchema.findById(employee_id)
    const allowedApps = await clientApp.find({users: employeeData})

    if(employee == null) res.status(400).json({message: "Invalid JWT!"})
    res.status(200).json({
        message: "success",
        data: {
            id: employeeData._id,
            name: employeeData.name,
            email: employeeData.email,
            allowedApps: allowedApps
        }
    })
})



module.exports = employee