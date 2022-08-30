const express = require("express");
const app = express();
const path = require("path");

//---------------Recursos estáticos----
app.use(express.static("public"));
//---------------Ejs config--------
app.set("view engine", "ejs");

//---------------Servidor local-----

app.listen(3000, ()=>console.log ("Server running on port 3000"));

//---------------Ruteo-----

app.get("/", function (req, res){

    res.render("./home_weiss.ejs");

});
app.get("/carrito_compras", function (req, res){

    res.render( "./carrito_compras.ejs");

});
app.get("/productos", function (req, res){

    res.render("./productos.ejs")

});
app.get("/login", function (req, res){

    res.render("./login.ejs")

});
app.get("/registro", function (req, res){

    res.render("./registro.ejs");

})
