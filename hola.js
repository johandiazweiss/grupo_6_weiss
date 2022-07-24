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

