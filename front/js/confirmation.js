//insérer le numéro de commande sur la page de confirmation
let orderId = document.getElementById("orderId");
orderId.textContent = getorderId();

//récupérer le "orderId" depuis l'URL
function getorderId() {
    let url = new URLSearchParams(window.location.search);
    if (url.has('id')){
    return url.get('id');  
    }
    window.location.href = "http://localhost:5500/front/html/index.html";
  }