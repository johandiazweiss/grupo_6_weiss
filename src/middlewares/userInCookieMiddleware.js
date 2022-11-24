const db = require("../database/models/index.js")
const userInCookieMiddleware = async function(req, res, next){
    let userEmailcookie = req.cookies.userEmail;
    if (userEmailcookie) {
        await db.Users.findOne({
            include: [{association: "roles"}],
            where:{email: userEmailcookie}
        })
        .then((user)=>{
            return req.session.userLogged = user
        })
    }
    next();
}

module.exports = userInCookieMiddleware;





