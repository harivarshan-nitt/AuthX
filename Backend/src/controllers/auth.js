const auth = require('express').Router();
const bcrypt = require('bcrypt')

const employeeSchema = require("../models/schema/employee")
const clientAppSchema = require("../models/schema/clientApp");
const verifyJWT = require('../middlewares/verifyJWT');
const { createJWT } = require('../helpers/jwt');

auth.use("/permission",verifyJWT, require("../routes/permission"))
auth.use("/access_token", require("../routes/accessToken"))

auth.post("/login", async (req, res)=>{
    const email = req.body.email
    const pass = req.body.password
    const clientAppId = req.body.clientAppID

    try{
        if(!email || !pass) res.status(400).json({message: "Bad request"})
        else{
            const userExists = await employeeSchema.findOne({
                email: email
            })
            if(userExists == null)
                res.status(401).json({
                    message: "Email does not exist"
                })
            else{
                const success = await bcrypt.compare(pass, userExists.password)
                if (success){
                    const data = {"id": userExists._id}
                    const token = createJWT(data)
                    if(clientAppId == null){
                        res.status(200).json({
                            redirect: process.env.FRONTEND_URL + "/profile",
                            message: "Login Successful",
                            token: token
                        })
                    }
                    else{
                        res.status(200).json({
                            redirect: process.env.FRONTEND_URL + "/authorize?clientAppID=" + clientAppId,
                            message: "Login Successful",
                            token: token
                        })        
                    }
                }
                else{
                    res.status(401).json({
                        message: "Login Failed, Incorrect password",
                    })
                }
            }
        }
    }

    catch(err){
        console.log(err)
        res.status(500).json({
            message: "Internal server error!"
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
    if (pass!=repeat || (!email || !pass || !repeat || !name)){
        res.status(400).json({
            status: 400,
            message: "Bad request"
        })
    }
    else{
        try{
            const userExists = await employeeSchema.findOne({
                email: email
            })
            if(userExists != null)
                res.status(401).json({
                    message: "User Exists! Try logging in"
                })
            else{
                const hash = await bcrypt.hash(pass, salt)
                const new_user = await employeeSchema.create({
                    email: email,
                    password: hash,
                    name: name
                })
                res.status.json({
                    message: "Account Created! You can login now...",
                    redirect: process.env.FRONTEND_URL + "/login"
                })
            }        
        }
        catch(err){
            console.log(err)
            res.status(500).json({
                status: 500,
                response: "Unexpected Server Error!"
            })
        }
    }   
    
})

module.exports = auth