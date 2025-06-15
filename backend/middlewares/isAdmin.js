module.exports = function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin === true) {
        return next();
    } else {
        return res.status(403).json({
            error: "You are not authorized for this action."
        });
    }
};
