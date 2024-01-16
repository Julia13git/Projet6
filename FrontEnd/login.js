async function login(event) {

    try {
        const body = {
            email: event.target.querySelector("[name=email").value,
            password: event.target.querySelector("[name=password]").value
        };
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (response.status === 200){
            const tabUser  = await response.json();
            const token = tabUser.token;
            console.log(token);//affiche dans le console
            window.localStorage.setItem("token",token );//sauvegarde le token
            window.location.replace("index.html");//redirection vers la page index.html
        } else {
            const errorMessage = document.getElementById("error-message");
            errorMessage.style.display = "block";
        }
    } catch (error){
        console.log("Connexion impossible");
    }
}

const formLogin = document.querySelector(".form-login");
formLogin.addEventListener("submit", function (event) {
    login(event);
    event.preventDefault();//prevent the page from refreshing
});