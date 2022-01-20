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

function addBasket(produit){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == produit.id);
    if (foundProduct != undefined){
        foundProduct.quantity++;
    } else {
        produit.quantity = 1;
        basket.push(produit); 
    }
    
    saveBasket(basket);
}

function removeFromBasket(produit){
    let basket = getBasket();
    basket = basket.filter(p => p.id != produit.id);
    saveBasket(basket);
}

function changeQuantity(produit, quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == produit.id);
    if (foundProduct != undefined){
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0){
            removeFromBasket(foundProduct);
        } else {
           saveBasket(basket) 
        }
    } 
}

function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for (let produit of basket){
        number += produit.quantity;
    }
    return number;
}

function getTotalPrice(){
    let basket = getBasket();
    let total = 0;
    for (let produit of basket){
        total += produit.quantity * produit.price;
    }
    return total;
}