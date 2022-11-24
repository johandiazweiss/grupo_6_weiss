//si hay un user en session, no dejará pasar al controller

const guestMiddleware = function (req, res, next){
    if(req.session.userLogged){
       return res.redirect("/") 
    }
    else{
       return next()
    }
}

module.exports = guestMiddleware;