const jwt = require("jsonwebtoken");

const getToken = async(email , user) => {
    const token = jwt.sign({identifier : user._id} , "mysecretkeystring");
    return token;
}

module.exports = getToken;