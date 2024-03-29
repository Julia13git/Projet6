// Variables gloables
const gallery = document.querySelector(".gallery");//recuperation du block "gallery"
const category = document.querySelector(".category");//recuperation du block "category"
// Récupération token éventuellement stockées dans le localStorage
const token = window.localStorage.getItem("token");
//L'appel de cette fonction avec en paramètre l'Event associé 
const actionBtnFilter = function(event) {         
    showGallery(event.target.dataset.category);
    event.target.classList.add("btn-active"); 
};

let imageLoaded = false;

// Reset bouton et formulaire
function resetBtnForm() {
    imageLoaded = false ;
    btnConfirm.style.background = "#A7A7A7";
    btnConfirm.setAttribute('disabled', '');
    document.getElementById("form-ajout-photo").reset();
}

async function createFilter(){ 
    //L'appel a serveur les categories   
    let response = await fetch("http://localhost:5678/api/categories");
    let categories = await response.json();
    categories = categories.forEach(categorie => {
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
    document.querySelectorAll(".gallery figure").forEach( figure=> figure.remove());
    
    
    // Appel de l api pour afficher les "works"
    let response = await fetch("http://localhost:5678/api/works");
    let works = await response.json();
    works = works.forEach(work => {
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
    const filterGroup = document.querySelector(".category");//on recupere le block avec les filtres en HTML
    filterGroup.remove();//on supprime les filtres
    
    // Changement de login en logout
    let loginLink = document.getElementById("login-link");//recuper l'élément HTML login
    loginLink.innerHTML = '<a id="logout-link" href="#">logout</a>';//on change la partie du HTML
    const logOut = document.getElementById("logout-link");//on recupere l'élement HTML logout
    logOut.addEventListener ("click", ()=>{//on ajoute un évenement
        window.localStorage.removeItem("token");//on supprime le token du local storage
        window.location.reload();//on reload la page
    });
    
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
                fetch ("http://localhost:5678/api/works/" + id , { 
                method: 'DELETE', 
                headers: {Authorization: 'Bearer ' + token }
            })
            .then (response=> {
                let worksDelete = response.json();
                document.getElementById("previewImageContainer").style.display = "none";
                document.getElementById("inputImageContainer").style.display = "flex";                    
                document.querySelector(".open-modal").click(); 
                showGallery(0);                   
            });
            
        });
    });
    
});
});
});

//Fermeture de la fenetre modale avec l'icone fermer
const closeModal = document.getElementById("close-modal");
closeModal.addEventListener("click", function(){
    document.getElementById("modal").style.display = "none";
    showGallery(0);
});
// Fermeture de la fenetre modale avec le click dehors la modale
const myModal = document.getElementById("modal");
myModal.addEventListener("click", function(event){
    if (event.target == myModal)
    {
        myModal.style.display ="none";
    }
});

//Récuperer le btnModal"Ajouter une photo " et ajouter un événement
const btnModal = document.querySelector(".btn-modal");
btnModal.addEventListener("click", ()=> {
    document.getElementById("modal-content").style.display = "none";
    document.querySelector(".ajout-photo").style.display = "flex";
    document.getElementById("previewImageContainer").style.display = "none";
    document.getElementById("inputImageContainer").style.display = "flex";
    document.getElementById("message-info-ajout").innerHTML="";
    resetBtnForm();// Reset bouton et formulaire
});

//Recuper la fleche, ajoute un clique, change le style
const btnArrow = document.querySelector(".fa-arrow-left");
btnArrow.addEventListener("click", ()=> {
    document.querySelector(".ajout-photo").style.display = "none";
    document.getElementById("modal-content").style.display = "flex";
    document.getElementById("previewImageContainer").style.display = "none";
    document.getElementById("inputImageContainer").style.display = "flex";
});
//Fermer la fenetre modale "ajout photo" avec le bouton fermer
const closeModalPhoto = document.getElementById("close-modal-photo");
closeModalPhoto.addEventListener("click", function(){
    document.getElementById("modal").style.display = "none";
});

//Afficher l'image selectionée
function previewImage() {
    const fileInput = document.getElementById('input-photo');
    const file = fileInput.files[0];
    const previewImageContainer = document.getElementById('previewImageContainer');
    previewImageContainer.style.display = "flex";
    
    if(file.type.match('image.*')){//controler le format du fichier
        const reader = new FileReader();
            reader.addEventListener('load', function (event) {        
            const imageUrl = event.target.result;//result en cas de succes
            const image = new Image();            
            
             image.addEventListener('load', function(event) {
                  document.getElementById("inputImageContainer").style.display = "none";
                  previewImageContainer.innerHTML = ''; //vider le conteneur au cas où il y aurait déjà des images.
                  previewImageContainer.appendChild(image);
              }); 
            
            image.src = imageUrl;
            image.style.width = '129px';
            image.style.height = '170px'; 
        });
        
        reader.readAsDataURL(file);//lire le contenu du file
        imageLoaded = true;
    }
}

//Confirmer d'ajout une photo
const btnConfirm = document.querySelector(".btn-valider");
btnConfirm.addEventListener("click", async(event)=>{    
    const formData = new FormData(); 
    event.preventDefault();
    try {
        formData.append("title", document.getElementById("title").value);
        formData.append("category", parseInt(document.getElementById("select-category").value));
        
        const inputPhoto = document.getElementById("input-photo");
        formData.append("image",inputPhoto.files[0]);
        
        const response = await fetch ("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: { Authorization: 'Bearer ' + token }
        });

    if (response.status === 201){
        resetBtnForm();// Reset bouton et formulaire
        document.querySelector(".open-modal").click();  
        showGallery(0);
    } else {
        document.getElementById("message-info-ajout").innerHTML = "Echec de la sauvegarde";
    }
    
} catch (error){
    console.error(error);
}
});

//La comportement du bouton valider
const listeInputAjoutPhoto = document.querySelectorAll(".input-ajout-photo");
listeInputAjoutPhoto.forEach(element => {
    element.addEventListener("change", function(){
        
        // Si l ensemble des elements sont remplis Alors on met le bouton Valider à vert
        if (document.getElementById("title").value != "" && 
        document.getElementById("select-category").value != "" && imageLoaded){
            btnConfirm.style.background = "#1D6154";
            btnConfirm.removeAttribute("disabled");
        } else {
            btnConfirm.style.background = "#A7A7A7";
            btnConfirm.setAttribute("disabled", '');
        }
    });
});

