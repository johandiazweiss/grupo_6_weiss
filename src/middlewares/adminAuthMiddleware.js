const adminAuthMiddleware = function (req, res, next){
   let userLogged = req.session.userLogged;
   if(userLogged && userLogged.roles.name == "admin"){
      return next()
   }
   else{
      res.send("debes ser admin para acceder");
   }
}

module.exports = adminAuthMiddleware;