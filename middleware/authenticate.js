const isAuthenticated= (req, res, next) => {
    console.log(req.session)
    if (req.session.user ===undefined){
        return res.status(401).json("You do not have access.");
    }
    next();
};

module.exports = {
    isAuthenticated
}