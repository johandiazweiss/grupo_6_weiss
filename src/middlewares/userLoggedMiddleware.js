const db = require("../database/models/index.js");

const userLoggedMiddleware = function (req, res, next) {
    let currentUser = req.session.userLogged;
    if (currentUser) {
        res.locals.currentUser = currentUser;
    }
    next();
}

module.exports = userLoggedMiddleware;