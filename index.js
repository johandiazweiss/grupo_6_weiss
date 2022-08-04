const express = require("express");
const app = express();
const path = require("path");
app.use(express.static('public'));

//---------------Recursos estáticos----
app.use(express.static("public"));

//---------------Servidor local-----

app.listen(3000, ()=>console.log ("Server running on port 3000"));

//---------------Ruteo Home-----

app.get("/", function (req, res){

    res.sendFile(path.join(__dirname, "views/home_weiss.html"))

});
app.get("/carrito_compras", function (req, res){

    res.sendFile(path.join(__dirname, "views/carrito_compras.html"))

});
app.get("/productos", function (req, res){

    res.sendFile(path.join(__dirname, "views/productos.html"))

});
app.get("/login", function (req, res){

    res.sendFile(path.join(__dirname, "views/login.html"))

});
app.get("/registro", function (req, res){

    res.sendFile(path.join(__dirname, "views/registro.html"))

});