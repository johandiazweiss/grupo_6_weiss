const fs = require("fs")
const path = require("path")

let productosJSON = fs.readFileSync(path.resolve(__dirname, "./src/database/productsData.json"), { encoding: "utf-8" });
let array = JSON.parse(productosJSON);

array.sort((a, b)=>{

})

array.sort(function (a, b){
    if (a.title.toLowerCase() > b.title.toLowerCase()){
        return +1;
    }
    else if(a.title.toLowerCase() < b.title.toLowerCase()){
        return -1;
    }
    else{
        return 0;
    }
})


console.log(array);