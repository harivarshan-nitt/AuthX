const Employee = require("../models/schema/employee");
const getUserData = async(req, res) => {
    try {
        const empId = req.jwt_payload.id;
        const scopes = req.jwt_payload.scopes;
        const employee = await Employee.findById(empId).select("-password");
        const resource = {}
        for (let i = 0; i < scopes.length; i++) {
            resource[scopes[i]] = employee[scopes[i].toLowerCase()]
        }
        if (employee == null) {
            return res.status(404).json({
                message: "Employee not found"
            })
        } else {
            return res.status(200).json({
                data: resource
            })
        }
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
module.exports = getUserData