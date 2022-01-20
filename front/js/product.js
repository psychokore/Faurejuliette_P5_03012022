//Récupération de l'ID//
const url = new URLSearchParams(window.location.search); //récupération des query au sein de l'URL


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
    pageContent(product)
    //ajout au panier
    document.getElementById("addToCart").addEventListener('click', function(){
        addBasket(product);
        alert('Votre article a été ajouté dans le panier');
    });
})
.catch(error=>window.location.href = "http://localhost:5500/front/html/index.html");


//Création des variables
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const image = document.getElementsByClassName("item__img")[0];
let picture = document.createElement("img");
image.appendChild(picture);


/**
 * Affichage des informations du product
 * @param {Object} product 
 */
function pageContent(product){
        title.textContent = product.name;
        price.textContent = product.price;
        description.textContent = product.description;
        picture.setAttribute("src", product.imageUrl);
        picture.setAttribute("alt", product.altTxt);
        
        let options = product.colors;
        options.forEach(function(element,key){
            colors[key] = new Option (element, key);
        });
}



