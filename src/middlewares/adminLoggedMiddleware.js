
const adminLoggedMiddleware = function (req, res, next) {

    let userLogged = req.session.userLogged;
    let adminCheck = true;
    if(userLogged && userLogged.roles.name == "admin"){
        res.locals.adminCheck = adminCheck;
    }
    next();
}

module.exports = adminLoggedMiddleware;