function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket)); //transforme l'objet en chaîne de caractères
}

function getBasket(){
    let basket=localStorage.getItem("basket");
    if (basket == null){
        return [];
    } else {
        return JSON.parse(basket); //transforme la chaîne en objet
    }
    
}

const products = []
console.log(getBasket());

// Récupération des informations de l'API
function infoResquest (){
    let basket = getBasket();
    for (let i = 0; i < basket.length; i++){
    fetch(`http://localhost:3000/api/products/${basket[i].id}`)
    .then (function (res){
        if (res.ok){
            return res.json();
        }
    })
    .then ((data) => basketContent({...basket[i], price: data.price, name: data.name, imageUrl: data.imageUrl, altTxt: data.altTxt}))
}
}

infoResquest();
//async await


function basketContent (product){
    products.push(product);
//Création des éléments HTML
//Article
        let productArticle = document.createElement("article");
        document.getElementById("cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";

//Div Image
        let productImageDiv = document.createElement("div");
        productArticle.appendChild(productImageDiv);
        productImageDiv.className = "cart__item__img";

//Image du produit
        let productImage = document.createElement("img");
        productImageDiv.appendChild(productImage);
        productImage.setAttribute("src", product.imageUrl);
        productImage.setAttribute("alt", product.altTxt);

// Div informations produits
        let itemContent = document.createElement("div");
        productArticle.appendChild(itemContent);
        itemContent.className = "cart__item__content";

//Div description produit
        let itemDescription = document.createElement("div");
        itemContent.appendChild(itemDescription);
        itemDescription.className = "cart__item__content__description";

//Nom produit
        let productName = document.createElement("h2");
        productName.textContent = product.name;
        itemDescription.appendChild(productName);
        

//Couleur produit
        let productColor = document.createElement("p");
        productColor.textContent = product.couleur;
        itemDescription.appendChild(productColor);
        

//Prix produit
        let productPrice = document.createElement("p");
        productPrice.textContent = product.price + "€"; 
        itemDescription.appendChild(productPrice);
        

//Div setting
        let itemSetting = document.createElement("div");
        productArticle.appendChild(itemSetting);
        itemSetting.className = ("cart__item__content__settings");

//Setting quantité
        let quantitySetting = document.createElement("div");
        itemSetting.appendChild(quantitySetting);
        quantitySetting.className = "cart__item__content__settings__quantity";

// Texte quantité
        let quantityText = document.createElement("p");
        quantitySetting.appendChild(quantityText);
        quantityText.textContent = "Qté : ";

//Input quantité
        let selectQuantity = document.createElement("input");
        selectQuantity.className = "itemQuantity";
        selectQuantity.setAttribute("type", "number");
        selectQuantity.setAttribute("min", "1");
        selectQuantity.setAttribute("max", "100");
        selectQuantity.setAttribute("name", "itemQuantity");
        selectQuantity.value = product.quantity;
        quantitySetting.appendChild(selectQuantity);

//Div delete
        let deleteContent = document.createElement("div");
        productArticle.appendChild(deleteContent);
        deleteContent.className = "cart__item__content__settings__delete";

//Delete Item
        let deleteItem = document.createElement("p");
        deleteContent.appendChild(deleteItem);
        deleteItem.textContent = "Supprimer";
        deleteItem.className = "deleteItem";
}




//ajouter addeventlistener au clic sur supprimer

//a appeler suite au clic
function removeFromBasket(product){
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id && p.couleur == product.couleur);
    saveBasket(basket);
}


//a appeler au changement de la valeur de quantité input ou change
function changeQuantity(product, quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id && p.couleur == product.couleur);
    if (foundProduct != undefined){
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0){
            removeFromBasket(foundProduct);
            //actualiser l'interface
        } else {
           saveBasket(basket) 
        }
    } 
}

function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for (let product of basket){
        number += product.quantity;
    }
    return number;
}

function getTotalPrice(){
    let total = 0;
    for (let product of products){
        total += product.quantity * product.price;
    }
    return total;
}