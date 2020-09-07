const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./users-model");
const restrict = require("../middleware/restrict");

const router = express.Router()

router.get("/users", restrict(), async(req, res, next) => {
    try{
        res.json(await Users.find())
    }catch(err){
        next(err)
    }
});

router.post("/register", async(req,res,next) => {
    try{
        const { username, password, department } = req.body
        const user = await Users.findBy({ username }).first()

        if(user){
            return res.status(409).json({ message: "Username is already taken."})
        }

        const newUser = await Users.add({
            username,
            password: await bcrypt.hash(password, 12),
            department,
        })

        res.status(201).json(newUser)

    }catch(err){
        next(err)
    }
});

router.post("/login", async (req,res,next) => {
    try{
        const { username, password, department } = req.body
        const user = await Users.findBy({ username }).first()

            if(!user){
                return res.status(401).json({ message: "Invalid credentials"})
            }
        //hash the password again and see if it matches what we have in the database
        const passwordValid = await bcrypt.compare(password, user.password)

        if(!passwordValid){
            return res.status(401).json({ message: "Invalid credentials"})
        }

        if(!department){
            return res.status(401).json({ message: "invalid department"})
        }

        //generate new json web token 
        const token = jwt.sign({
            userID: user.id,
            userDepartment: user.department,
        },process.env.JWT_SECRET)
        //send the token back
        res.cookie("token", token)  //this sends the token back as a cookie 
        //this sends the cookie back in the body 
        res.status(200).json({ token:token, message:`Welcome ${user.username} department:${user.department}`}) 

    }catch(err){
        next(err)
    }
})

module.exports = router