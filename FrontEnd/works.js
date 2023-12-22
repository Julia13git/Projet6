document.addEventListener("DOMContentLoaded", () => {
    function testWorks(){
        console.log(fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => works.forEach(work => console.log(work))));
    }

    //testWorks();

    function afficheGallery(){
        // STEP 1 : Ajouter les figures sur la gallery
        const gallery = document.querySelector(".gallery");

        fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => works.forEach(work => {
                const figure = document.createElement("figure");
                figure.innerHTML = "<img src=\"" + work.imageUrl + "\" alt=\"" + work.title + "\">";
                const figcaption = document.createElement("figcaption");
                figcaption.innerHTML = work.title; 
                figure.appendChild(figcaption);
                gallery.appendChild(figure);                                                
                }
            )            
        )

    }

    afficheGallery();
});