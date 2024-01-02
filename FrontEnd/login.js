async function login (event) {

    try {
        const body = {
            email: event.target.querySelector("[name=email").value,
            password: event.target.querySelector("[name=password]").value
        };
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })

        const tabUser  = await response.json();
        const token = tabUser["token"];
        console.log(token);
        window.localStorage.setItem("token",token );
        window.location.replace("index.html");

    } catch (error){
        console.log("Connexion impossible");
    }
}

const formLogin = document.querySelector(".form-login");
formLogin.addEventListener("submit", function (event) {
    login(event);
    event.preventDefault();
});



 
