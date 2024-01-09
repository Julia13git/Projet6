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
    document.getElementById("modal-content").style.display = "flex";
    document.querySelector(".ajout-photo").style.display = "none";
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
            trashBlock.innerHTML= '<i class="fa-solid fa-trash-can" data-id="' + works[i].id + '"></i>';                        
            img.setAttribute("src", works[i].imageUrl);
            img.setAttribute("id", works[i].id);
            figure.classList.add("figure-modal");
            figure.appendChild(trashBlock);
            figure.appendChild(img);                    
            galleryModal.appendChild(figure);   
        }

        // Ajout listeners sur tt les poubelles
        const allTrashCan = document.querySelectorAll('.fa-trash-can');
        allTrashCan.forEach(trashCan => {
            trashCan.addEventListener("click", function (event) {
                const id = event.target.dataset.id;
                console.log(id)
                const deleteConfirmed = confirm("Voulez vous supprimer le projet ?");
                console.log(deleteConfirmed);
                if (deleteConfirmed){
                    fetch ("http://localhost:5678/api/works/" + id , { 
                        method: 'DELETE', 
                        headers: {Authorization: 'Bearer ' + token }
                    })
                    .then (response=> {
                        let worksDelete = response.json();
                        console.log(worksDelete);
                        alert("Projet supprimé !")
                    })
                }
            })
        });
        
    }) 
})
})

//Fermeture de la fenetre modale
const closeModal = document.getElementById("close-modal");
closeModal.addEventListener("click", function(){
    document.getElementById("modal").style.display = "none";
})

//Récuperer le btnModal"Ajouter une photo " et ajouter un événement
const btnModal = document.querySelector(".btn-modal");
btnModal.addEventListener("click", ()=> {
    document.getElementById("modal-content").style.display = "none";
    document.querySelector(".ajout-photo").style.display = "flex";
})

//Recuper la fleche, ajoute un clique, change le style
const btnArrow = document.querySelector(".fa-arrow-left");
btnArrow.addEventListener("click", ()=> {
    document.querySelector(".ajout-photo").style.display = "none";
    document.getElementById("modal-content").style.display = "flex";
})

const closeModalPhoto = document.getElementById("close-modal-photo");
closeModalPhoto.addEventListener("click", function(){
    document.getElementById("modal").style.display = "none";
})

//Preview une photo avant confirmer
// const imageAjoute = document.getElementById("image-ajoute");
// const previewPicture = function (e){
//      const[picture] = e.files;
//      if (picture) {
//         // On change l'URL de l'image
//          image.src = URL.createObjectURL(picture)
//     }
// }
function previewImage() {
    const fileInput = document.getElementById('input-photo');
    const file = fileInput.files[0];
    const imagePreviewContainer = document.getElementById('previewImageContainer');
    
    if(file.type.match('image.*')){
      const reader = new FileReader();
      
      reader.addEventListener('load', function (event) {
        const imageUrl = event.target.result;
        const image = new Image();
        
        image.addEventListener('load', function() {
          imagePreviewContainer.innerHTML = ''; // Vider le conteneur au cas où il y aurait déjà des images.
          imagePreviewContainer.appendChild(image);
        });
        
        image.src = imageUrl;
        image.style.width = '129px'; // Indiquez les dimensions souhaitées ici.
        image.style.height = '193px'; // Vous pouvez également utiliser "px" si vous voulez spécifier une hauteur.
      });
      
      reader.readAsDataURL(file);
    }
  }

//Ajouter une photo
const btnConfirm = document.querySelector(".btn-valider");
btnConfirm.addEventListener("click", async()=>{
    const formData = new FormData();
    formData.append("title");
    formData.append("category");

    const image = document.getElementById("input-ajouter-photo");
    formData.append("image");

    const response = await fetch ("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
    });
    console.log(await response.json());
})







