// Variables gloables
const gallery = document.querySelector(".gallery");
const category = document.querySelector(".category");

const actionBtnFilter = function(event) {         
    showGallery(event.target.getAttribute("category"));
    event.target.classList.add("btn-active"); 
}

function createFilter(){    
    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => categories.forEach(categorie => {
        const button = document.createElement("button");
        button.setAttribute("category",categorie.id);
        button.setAttribute("class","btn-filter");
        button.innerHTML = categorie.name ;        
        category.appendChild(button);
        button.addEventListener ("click",actionBtnFilter);
    }));
}


function showGallery(categoryBtn){
    // Si un bouton HTML actif existe alors on le rend inactif
    if(document.querySelector(".btn-active")){
        document.querySelector(".btn-active").classList.remove("btn-active");
    }
    
    // Boucle pour supprimer un par un les elements figures
    //document.querySelectorAll(".gallery figure").forEach(function(figure){figure.remove()});
    document.querySelectorAll(".gallery figure").forEach( figure=> figure.remove());
    
    
    // Appel de l api pour afficher les "works"
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => works.forEach(work => {
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
    })            
    )
    
}

createFilter();
// Appelé une seule fois au chargement de la page
showGallery(0);
const btnTous = document.getElementById("btn-tous");
btnTous.addEventListener ("click",actionBtnFilter);
btnTous.classList.add("btn-active");

