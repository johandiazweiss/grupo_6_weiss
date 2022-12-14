window.onload = function () {
    fetch("http://localhost:3001/api/productos")
        .then(productos => productos.json())
        .then((productos) => {
            for (producto of productos.data[0]) {
                console.log(producto.name)
                document.querySelector(".results").innerHTML += producto.name
            }
        })
    }
   


