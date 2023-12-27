// Variables gloables
const gallery = document.querySelector(".gallery");

function showGallery(type){
    // Si element HTML active existe on le supprime
    if(document.querySelector(".btn-active")){
        document.querySelector(".btn-active").classList.remove("btn-active");
    }

    // Boucle pour supprimer un par un les elements figures
    document.querySelectorAll(".gallery figure").forEach( figure=> figure.remove());    

    // Appel de l api pour afficher les "works"
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => works.forEach(work => {
            // Filtre sur la categorie ou tt la galerie
            if (work.categoryId == type || type == 0){
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

// Appelé une seule fois au chargement de la page
showGallery(0);
document.getElementById("btn-tous").classList.add("btn-active");

const tabBtnFilter = document.querySelectorAll(".btn-filter");
tabBtnFilter.forEach(function(btn){
    btn.addEventListener ("click",function(event) {         
        showGallery(event.target.getAttribute("category"));
        event.target.classList.add("btn-active"); 
    });
});
