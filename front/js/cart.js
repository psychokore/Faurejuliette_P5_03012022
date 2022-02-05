//Sauvegarder du panier
function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket)); //transforme l'objet en chaîne de caractères
}

//Récupération du panier
function getBasket(){
    let basket=localStorage.getItem("basket");
    if (basket == null){
        return [];
    } else {
        return JSON.parse(basket); //transforme la chaîne en objet
    }
    
}

const products = []

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
document.getElementsByClassName("deleteItem").addEventListener('click', function(){
    removeFromBasket(product);
});

//a appeler suite au clic
function removeFromBasket(product){
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id && p.couleur == product.couleur);
    saveBasket(basket);
}

document.getElementsByClassName("itemQuantity").addEventListener('change', function(){
    changeQuantity(product);
});
//a appeler au changement de la valeur de quantité input ou change
function changeQuantity(product, quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id && p.couleur == product.couleur);
    if (foundProduct != undefined){
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0){
            removeFromBasket(foundProduct);
            location.reload();
        } else {
           saveBasket(basket) 
        }
    } 
}

function getNumberProduct(){
    let totalQuantity = 0;
    for (let product of products){
        totalQuantity += product.quantity;
    }
    return totalQuantity;   
}


let totalQuantity = getNumberProduct();
let cartQuantity = document.getElementById("totalQuantity");
cartQuantity.textContent = totalQuantity;


function getTotalPrice(){
    let total = 0;
    //new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number)
    for (let product of products){
        total += product.quantity * product.price;
    }
    return total;
}

let total = getTotalPrice();
let totalPrice = document.getElementById("totalPrice");
totalPrice.textContent = total;



//Formulaire

//Récupérer le formulaire
let orderForm = document.querySelector('.cart__order__form');

//Ecouter la modification du champ "prénom"
orderForm.firstName.addEventListener('change', function() {
    validFirstName(this);
})
//Vérifier le champ "prénom"
function validFirstName(inputFirstName) {
    let firstNameRegExp = new RegExp('^[A-Za-z éèëôîï-]+$', 'g');
    let testFirstName = firstNameRegExp.test(inputFirstName.value);
    if (testFirstName) {
        document.querySelector('#firstNameErrorMsg').innerText = '';
        return true;
    } else {
        document.querySelector('#firstNameErrorMsg').innerText = 'Veuillez saisir un prénom valide.';
        return false;
    }
}

//Ecouter la modification du champ "nom"
orderForm.lastName.addEventListener('change', function() {
    validLastName(this);
})
//Vérifier le champ "nom"
function validLastName(inputLastName) {
    let lastNameRegExp = new RegExp("^[A-Za-z éèëôîï'-]+$", "g");
    let testLastName = lastNameRegExp.test(inputLastName.value);
    if (testLastName) {
        document.querySelector('#lastNameErrorMsg').innerText = '';
        return true;
    } else {
        document.querySelector('#lastNameErrorMsg').innerText = 'Veuillez saisir un nom valide.';
        return false;
    }
}

//Ecouter la modification du champ "adresse"
orderForm.address.addEventListener('change', function() {
    validAddress(this);
})
//Vérifier le champ "adresse"
function validAddress(inputAddress) {
    let addressRegExp = new RegExp('[A-Za-zéèëôîï0-9\'\.\-\s\,]{5}', 'g');
    let testAddress = addressRegExp.test(inputAddress.value);
    if (testAddress) {
        document.querySelector('#addressErrorMsg').innerText = '';
        return true;
    } else {
        document.querySelector('#addressErrorMsg').innerText = 'Veuillez saisir une adresse valide.';
        return false;
    }
}

//Ecouter la modification du champ "ville"
orderForm.city.addEventListener('change', function() {
    validCity(this);
})
//Vérifier le champ "ville"
function validCity(inputCity) {
    let cityRegExp = new RegExp('[A-Za-zéèëôîï0-9\'\.\-\s\,]{2}', 'g');
    let testCity = cityRegExp.test(inputCity.value);
    if (testCity) {
        document.querySelector('#cityErrorMsg').innerText = '';
        return true;
    } else {
        document.querySelector('#cityErrorMsg').innerText = 'Veuillez saisir un nom de ville valide.';
        return false;
    }
}

//Ecouter la modification du champ "email"
orderForm.email.addEventListener('change', function() {
    validEmail(this);
})
//Vérifier le champ "email"
function validEmail(inputEmail) {
    let emailRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.+-]+[.]{1}[a-z]{2,10}$', 'g'
    );
    let testEmail = emailRegExp.test(inputEmail.value);
    if (testEmail) {
        document.querySelector('#emailErrorMsg').innerText = '';
        return true;
    } else {
        document.querySelector('#emailErrorMsg').innerText = 'Veuillez saisir un email valide.';
        return false;
    }
}

