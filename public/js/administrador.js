window.onload = function () {

    let pageContent = document.querySelector(".page_content");
    let deleteForm = document.querySelector("#deleteForm");

    fetch("http://localhost:3000/api/productos")
        .then(response => response.json())
        .then(data => {
            let productsArray = data.data[0];
            productsArray.forEach(product => {
                let itemRow = "<div class=adminProductListElement> " +
                    "<img src='/img productos_weiss/productosImages/" + product.image_1 + "' width=55px alt=product_icon>" +
                    "<p>" + product.name + "</p>" +
                    "<div class=productDetail_adminButtons>" +
                    "<a class=productDetail_a href='/productos/detalle/" + product.id + "/admin/edit'>" +
                    "<div class=productDetail_adminEditButton>" +
                    "<p>EDITAR PRODUCTO</p>" +
                    "</div>" +
                    "</a>" +
                    "<a class=productDetail_a>" +
                    "<form id=deleteForm action='/productos/detalle/" + product.id + "/admin/delete?_method=DELETE' method=post>" +
                    "<button type=submit class=productDetail_adminDeleteButton>ELIMINAR PRODUCTO</button>" +
                    "</form>" +
                    "</a>" +
                    "</div>" +
                    "</div>"
                pageContent.innerHTML += itemRow;
            })
        })
        

       



}



