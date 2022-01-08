//Accéder à la section dédiée aux produits de la HomePage
const items = document.getElementById("items");

//Demande de l'ensemble des produits, récupération des données
fetch("http://localhost:3000/api/products")
.then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
.then((data) => cartContent(data))
.catch((err) => console.log("Oh no", err));


// Ajout de chaque produit à la homepage via boucle
function cartContent(products) {
  for (let i = 0; i < products.length; i++) {
//Création des élèments HTML
    let productLink = document.createElement("a");
    let productCard = document.createElement("article");
    let productImage = document.createElement("img");
    let productName = document.createElement("h3");
    let productDescription = document.createElement("p");
//Initialisation des noms 
    productLink.href = "./product.html?id=" + products[i]._id;
    productImage.src = products[i].imageUrl;
    productName.innerHTML = products[i].name;
    productDescription.innerHTML = products[i].description;
//Hiérarchisation des éléments HTML
    productLink.appendChild(productCard);
    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productDescription);

    items.appendChild(productLink);
  }
}
