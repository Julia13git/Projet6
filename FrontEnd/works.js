// On attend le chargement de la page avec DOMContentLoaded 
document.addEventListener("DOMContentLoaded", () => {

    // Variables gloables
    const gallery = document.querySelector(".gallery");

    function testWorks(){
        console.log(fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => works.forEach(work => console.log(work))));
    }

    //testWorks();

    function afficheGallery(type){
        // STEP 1 : Ajouter les figures sur la gallery
        

        fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => works.forEach(work => {
                // Filtre que su les hotels
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
        while (gallery.firstChild) {
            gallery.firstChild.remove();
        }
        afficheGallery(1);
    });

    const btnAppart = document.getElementById("btn-appart");
    btnAppart.addEventListener ("click",function() {        
        while (gallery.firstChild) {
            gallery.firstChild.remove();
        }
        afficheGallery(2);
    });

    const btnHotel = document.getElementById("btn-hotel");
    btnHotel.addEventListener ("click",function() {        
        while (gallery.firstChild) {
            gallery.firstChild.remove();
        }
        afficheGallery(3);
    });

    const btnTous = document.getElementById("btn-tous");
    btnTous.addEventListener ("click",function() {        
        while (gallery.firstChild) {
            gallery.firstChild.remove();
        }
        afficheGallery(0);
    });

});

/*categories*/
// function category() {    
//     
//     const btnObjet = document.getElementById("btn-objet");
//     btnObjet.addEventListener ("click",function() {
//         const workObjet = works.filter(function(work) {
//             return work.categoryId === 1;
//         })
//         console.log(btnObjet)
//     });

//     const btnAppart = document.getElementById("btn-appart");
//     btnAppart.addEventListener ("click",function() {
//         console.log(btnAppart)
//     });

//     const btnHotel = document.getElementById("btn-hotel");
//     btnHotel.addEventListener ("click",function() {
//         console.log(btnHotel)
//     });  
// };
//     category();
