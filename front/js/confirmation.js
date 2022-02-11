//insérer le numéro de commande sur la page de confirmation
let orderId = document.getElementById("orderId");
orderId.textContent = getorderId();

//récupérer le "orderId" depuis l'URL
function getorderId() {
    let url = new URLSearchParams(window.location.search); ;
    return url;
  }