const express = require("express");
const app = express();
const path = require("path");

//---------------Recursos estáticos----
app.use(express.static("public"));

//---------------Servidor local-----

app.listen(3050, ()=>console.log ("Server running on port 3050"));

//---------------Ruteo Home-----

app.get("/", function (req, res){

    res.sendFile(path.join(__dirname, "views/home_weiss.html"))

});