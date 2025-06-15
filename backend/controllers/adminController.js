const userModel = require("../models/userModel");

exports.makeAdminByUserId = async(req , res) => {
    const {userId} = req.body;
    const user = await userModel.findById(userId);
    if(!user){
        return res.status(400).json({
            error: "User doesn't exists with provided id."
        })
    }

    user.isAdmin = true;
    user.save();
    return res.status(200).json({
        Success: "Successfully made admin."
    })
}