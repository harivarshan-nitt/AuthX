const jwtSecretKey = process.env.JWTSECRET

const auth = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const employeeSchema = require("../models/schema/employee")
const clientAppSchema = require("../models/schema/clientApp");
const verifyJWT = require('../middlewares/verifyJWT');

auth.use("/permission",verifyJWT, require("../routes/permission"))
auth.use("/access_token", require("../routes/accessToken"))

auth.post("/login", async (req, res)=>{
    const clientAppId = req.body.clientAppId
    const email = req.body.email
    const pass = req.body.password

    console.log(req.body)

    try{
        const userExists = await employeeSchema.findOne({
            email: email
        })
        if(userExists == null)
            res.end({
                status: 401,
                response: "Email does not exist"
            })   
        else{
            const success = await bcrypt.compare(pass, userExists.password)
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
                    res.end(JSON.stringify({
                        status: 200,
                        redirect: process.env.FRONTEND_URL + "/authorize",
                        response: "Login Successful",
                        token: token
                    }))                    
                }
            }
            else{
                res.end(JSON.stringify({
                    status: 401,
                    response: "Login Failed, Incorrect password",
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
    console.log("POST: REGISTER")
    const email = req.body.email
    const name = req.body.name
    const pass = req.body.password
    const repeat = req.body.repeat
    const salt = await bcrypt.genSalt(10)
    console.log(req.body)

    if (pass!=repeat){
        res.end(JSON.stringify({
            status: 400,
            response: "Password and Repeat Password does not match"
        }))
    }
    else{
        try{
            const userExists = await employeeSchema.findOne({
                email: email
            })
            if(userExists != null)
                res.end(JSON.stringify({
                    status: 409,
                    response: "User Exists! Try logging in"
                }))
            else{
                const hash = await bcrypt.hash(pass, salt)
                const new_user = await employeeSchema.create({
                    email: email,
                    password: hash,
                    name: name
                })
                res.end(JSON.stringify({
                    status: 200,
                    response: "Account Created! You can login now...",
                    redirect: process.env.FRONTEND_URL + "/login"
                }))
            }        
        }
        catch(err){
            console.log(err)
            res.send(JSON.stringify({
                status: 500,
                response: "Unexpected Server Error!"
            }))
        }
    }   
    
})

module.exports = auth