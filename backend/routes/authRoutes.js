const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const getToken = require("../utils/helpers");

router.post("/register" , async(req , res) => {
    const {email , username , firstName, lastName , password , stageName} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        return res.status(403).json({error: "User Already Exist."});
    }

    const hash = await bcrypt.hash(password , 10);
    const newUserData = {
        email,
        password : hash,
        username,
        firstName,
        lastName,
        stageName,
    };

    const newUser = await UserModel.create(newUserData);

    const token = await getToken(email , newUser);

    const userToReturn = {...newUser.toJSON() , token}; // .toJSON is mongoose model
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
    
})


router.post("/login" , async(req,res) => {
    const {email , password} = req.body;
    const loginUser = await UserModel.findOne({email : email});
    if(!loginUser){
        return res.status(403).json({error: "Invalid credentials."});
    }

    const isPasswordRight = await bcrypt.compare(password, loginUser.password);
    if(!isPasswordRight){
        return res.status(403).json({error : "Invalid credentials."});
    }

    const token = await getToken(loginUser.email , loginUser);
    const userToReturn = {...loginUser.toJSON() , token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

})



module.exports = router;