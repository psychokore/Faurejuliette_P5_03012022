//Récupération de l'ID//
const url = new URLSearchParams(window.location.search); //récupération des query au sein de l'URL
//let id = url.get("id");

if (!url.has("id")) {
    window.location.href = "http://localhost:5500/front/html/index.html" //redirection à la page d'acceuil si non existant
}

fetch(`http://localhost:3000/api/products/${url.get("id")}`)
.then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
.then(function (product){
    if (!product){
        window.location.href = "http://localhost:5500/front/html/index.html" //redirection à la page d'acceuil si non existant  
    }
})
.catch(error=>window.location.href = "http://localhost:5500/front/html/index.html")
.then ((data) => pageContent(data));


//Création des variables
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const image = document.getElementsByClassName("item__img")[0];

//Affichage du produit
function pageContent(products){
    for (let i = 0; i < products.length; i++) {
        title.innerHTML = products[i].name;
        price.innerHTML = products[i].price;
        description.innerHTML = products[i].description;
    }
}