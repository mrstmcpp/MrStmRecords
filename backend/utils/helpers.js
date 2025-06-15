const jwt = require("jsonwebtoken");

const getToken = async (email, user) => {
    const token = jwt.sign({ id: user._id }, "mysecretkeystring", { expiresIn: '1d' });
    return token;
};


module.exports = getToken;