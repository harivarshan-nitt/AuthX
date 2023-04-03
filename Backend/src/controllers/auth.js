const jwtSecretKey = process.env.JWTSECRET

const auth = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const employeeSchema = require("../models/schema/employee")
const clientAppSchema = require("../models/schema/clientApp")

auth.post("/login", async (req, res)=>{
    const clientAppId = req.body.clientAppId
    const email = req.body.email
    const pass = req.body.pass

    try{
        const userExists = await employeeSchema.findOne({
            email: email
        })
        if(userExists == null)
            res.end({
                status: 406,
                response: "Email does not exist"
            })   
        const success = await bcrypt.compare(pass, userExists.pass)
        if (success){
            const data = {"id": userExists._id}
            const token = jwt.sign(data, jwtSecretKey)
            if(clientAppId == null){
                res.end(JSON.stringify({
                    status: 200,
                    redirect: process.env.FRONTEND_URL + "/profile",
                    response: "Login Successful",
                    token: token
                }))
            }
            else{
                const clientApp = await clientAppSchema.findOne({clientAppId: clientAppId})
                res.end(JSON.stringify({
                    status: 200,

                }))
                
            }
        }
    }
    catch(err){
        console.log(err)
        res.end({
            status: 500,
            response: "Internal server error!"
        })
    }
})
auth.post("/register", async (req, res)=>{
    
    const email = req.body.email
    const pass = req.body.pass
    const name = req.body.name
    const salt = await bcrypt.genSalt(10)
    
    try{
        const userExists = employeeSchema.findOne({
            email: email
        })
        if(userExists != null)
            res.end({
                status: 409,
                response: "User Exists! Try logging in"
            })        
        const new_user = await employeeSchema.create({
            email: email,
            pass: bcrypt.hash(pass, salt),
            name: name
        })
        res.end({
            status: 200,
            response: "Account Created! You can login now..."
        })            
    }
    catch{
        res.send({
            status: 500,
            response: "Unexpected Server Error!"
        })
    }
})

module.exports = auth