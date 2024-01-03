// Variables gloables
const gallery = document.querySelector(".gallery");
const category = document.querySelector(".category");
// Récupération token éventuellement stockées dans le localStorage
const token = window.localStorage.getItem("token");

const actionBtnFilter = function(event) {         
    showGallery(event.target.dataset.category);
    event.target.classList.add("btn-active"); 
}

async function createFilter(){    
    let response = await fetch("http://localhost:5678/api/categories");
    let categories = await response.json();
    categories = categories.forEach(categorie => {
        //.then(response => response.json())
        //.then(categories => categories.forEach(categorie => {
        const button = document.createElement("button");
        button.setAttribute("data-category",categorie.id);
        button.setAttribute("class","btn-filter");
        button.innerHTML = categorie.name.replace("Hotels", "Hôtels") ;        
        category.appendChild(button);
        button.addEventListener ("click",actionBtnFilter);
    });
}


async function showGallery(categoryBtn){
    // Si un bouton HTML actif existe alors on le rend inactif
    if(document.querySelector(".btn-active")){
        document.querySelector(".btn-active").classList.remove("btn-active");
    }
    
    // Boucle pour supprimer un par un les elements figures
    //document.querySelectorAll(".gallery figure").forEach(function(figure){figure.remove()});
    document.querySelectorAll(".gallery figure").forEach( figure=> figure.remove());
    
    
    // Appel de l api pour afficher les "works"
    let response = await fetch("http://localhost:5678/api/works");
    let works = await response.json();
    works = works.forEach(work => {
        //.then(response => response.json())
        //.then(works => works.forEach(work => {
        // Filtre sur la categorie ou tt la galerie
        if (work.categoryId == categoryBtn || categoryBtn == 0){
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            //figure.innerHTML = "<img src=\"" + work.imageUrl + "\" alt=\"" + work.title + "\">";
            img.setAttribute("src", work.imageUrl);
            img.setAttribute("alt", work.title);
            figure.appendChild(img);                    
            const figcaption = document.createElement("figcaption");
            figcaption.innerHTML = work.title; 
            figure.appendChild(figcaption);
            gallery.appendChild(figure);   
        }                                             
    });         
    
}

createFilter();
// Appelé une seule fois au chargement de la page
showGallery(0);
const btnTous = document.querySelector(".btn-tous");
btnTous.addEventListener ("click",actionBtnFilter);
btnTous.classList.add("btn-active");


if (token) {
    console.log("token:" + token);
    // Supprime les filtres
    const filterGroup = document.querySelector(".category");
    filterGroup.remove();

    // Changement de login en logout
    let loginLink = document.getElementById("login-link");
    loginLink.innerHTML = '<a id="logout-link" href="#">logout</a>';
    const logOut = document.getElementById("logout-link");
    logOut.addEventListener ("click", ()=>{
        window.localStorage.removeItem("token");
        window.location.reload();
    })

    //Ceation banniere noire mode edition
    let modeEdition  = document.getElementById("mode-edition");
    modeEdition.style.display = "flex";
    let modifier = document.getElementById("modifier");
    modifier.style.display = "flex";
} 

const openModal = document.querySelector(".open-modal");
openModal.addEventListener("click", function(){
    document.getElementById("modal").style.display = "flex";  
              
})

const galleryModal = document.querySelector(".gallery-modal");
    let response = fetch("http://localhost:5678/api/works").then(response => {
    let works = response.json().then(works => {
        let html = '';
        for (i = 0; i < works.length; i++) {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            //figure.innerHTML = "<img src=\"" + work.imageUrl + "\" alt=\"" + work.title + "\">";
            img.setAttribute("src", works[i].imageUrl);
            figure.appendChild(img);                    
            galleryModal.appendChild(figure);   
        }
    }) 
})


const closeModal = document.getElementById("close-modal");
closeModal.addEventListener("click", function(){
    document.getElementById("modal").style.display = "none";
})




