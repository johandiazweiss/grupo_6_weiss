<<<<<<< HEAD
const express = require('express');
const app = express();
const path = require('path');
app.listen(3000, () =>
console.log("El servidor esta Online")
)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/home.html'))
});
app.get('/404', (req, res) =>
res.send("Error página no encontrada")
)

=======
console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaa");
console.log("hola soy johan")
>>>>>>> d251118f150ff655f0d9c71e46c513bcccecd290
