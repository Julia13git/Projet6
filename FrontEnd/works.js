// Variables gloables
const gallery = document.querySelector(".gallery");//recuperation du block "gallery" en HTML
const category = document.querySelector(".category");//recuperation du block "category" en HTML
// Récupération token éventuellement stockées dans le localStorage
const token = window.localStorage.getItem("token");
//L'appel de cette fonction avec en paramètre l'Event associé 
//permet de trouver par target l'élément qui en est à l'origine et ainsi lui affecter une nouvelle class.
const actionBtnFilter = function(event) {         
    showGallery(event.target.dataset.category);
    event.target.classList.add("btn-active"); 
}

async function createFilter(){ 
    //L'appel a serveur les categories   
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

//Condition pour le token
if (token) {
    console.log("token:" + token);
    const filterGroup = document.querySelector(".category");//on recupere le block avec les filtres en HTML
    filterGroup.remove();//on supprime les filtres
    
    // Changement de login en logout
    let loginLink = document.getElementById("login-link");//recuper l'élément HTML login
    loginLink.innerHTML = '<a id="logout-link" href="#">logout</a>';//on change la partie du HTML
    const logOut = document.getElementById("logout-link");//on recupere l'élement HTML logout
    logOut.addEventListener ("click", ()=>{//on ajoute un évenement
        window.localStorage.removeItem("token");//on supprime le token du local storage
        window.location.reload();//on reload la page
    })
    
    //Creation banniere noire bar-edition et modifier et changement du style
    let modeEdition  = document.getElementById("bar-edition");
    modeEdition.style.display = "flex";
    let modifier = document.getElementById("modifier");
    modifier.style.display = "flex";
} 

//Ouverture de la fenetre modale
const openModal = document.querySelector(".open-modal");
openModal.addEventListener("click", function(){
    document.getElementById("modal").style.display = "flex";  
    //Création de la gallery dans la fenetre modale
    const galleryModal = document.querySelector(".gallery-modal");
    document.querySelectorAll(".gallery-modal figure").forEach( figure=> figure.remove());
    let response = fetch("http://localhost:5678/api/works").then(response => {
    let works = response.json().then(works => {
        for (i = 0; i < works.length; i++) {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const trashBlock = document.createElement("div");
            trashBlock.classList.add("trash-block");
            trashBlock.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
            img.setAttribute("src", works[i].imageUrl);
            figure.classList.add("figure-modal");
            figure.appendChild(trashBlock);
            figure.appendChild(img);                    
            galleryModal.appendChild(figure);   
        }
    }) 
})
})



//Fermeture de la fenetre modale
const closeModal = document.getElementById("close-modal");
closeModal.addEventListener("click", function(){
    document.getElementById("modal").style.display = "none";
})




