// Variables gloables
const gallery = document.querySelector(".gallery");

function testWorks(){
    console.log(fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => works.forEach(work => console.log(work))));
}

//testWorks();

function afficheGallery(type){
    // Si element HTML active existe on le supprime
    if(document.querySelector(".btn-active")){
        document.querySelector(".btn-active").classList.remove("btn-active");
    }

    // Boucle pour supprimer un par un les elements figures
    while (gallery.firstChild) {
        gallery.firstChild.remove();   
    }

    // Appel de l api pour afficher les "works"
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => works.forEach(work => {
            // Filtre sur la categorie ou tt la galerie
            if (work.categoryId == type || type == 0){
                    const figure = document.createElement("figure");
                    figure.innerHTML = "<img src=\"" + work.imageUrl + "\" alt=\"" + work.title + "\">";
                    const figcaption = document.createElement("figcaption");
                    figcaption.innerHTML = work.title; 
                    figure.appendChild(figcaption);
                    gallery.appendChild(figure);   
                }                                             
            })            
    )

}

afficheGallery(0);

const btnObjet = document.getElementById("btn-objet");
btnObjet.addEventListener ("click",function() {        
    afficheGallery(1);
    btnObjet.classList.add("btn-active");
});

const btnAppart = document.getElementById("btn-appart");
btnAppart.addEventListener ("click",function() {        
    afficheGallery(2);
    btnAppart.classList.add("btn-active");
});

const btnHotel = document.getElementById("btn-hotel");
btnHotel.addEventListener ("click",function() {        
    afficheGallery(3);
    btnHotel.classList.add("btn-active");
});

const btnTous = document.getElementById("btn-tous");
btnTous.addEventListener ("click",function() {        
    afficheGallery(0);
    btnTous.classList.add("btn-active");   
});