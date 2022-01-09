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
})
.catch(error=>window.location.href = "http://localhost:5500/front/html/index.html")