//si hay un user en session, te dejará continuar
//debes estar autenticado (logueado) para avanzar sobre la ruta

const authMiddleware = function (req, res, next){
    if(req.session.userLogged){
       return next()
    }
    else{
       return res.redirect("/cuenta/login") 
    }
}

module.exports = authMiddleware;