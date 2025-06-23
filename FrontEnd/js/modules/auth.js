export { AUTH };

const emailInput = document.querySelector("[name=email]");
const passwordInput = document.querySelector("[name=password]");
const allInputs = [emailInput, passwordInput];

let errors = [];
const errorMessage = document.querySelector(".error-message");

const AUTH = {
    authUser: function() {
        const loginForm = document.querySelector(".login-form");
        loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        errors = AUTH.getLoginFormErrors(emailInput.value, passwordInput.value);

        const loginInfo = {
            email: emailInput.value,
            password: passwordInput.value
        };
        const payload = JSON.stringify(loginInfo);
        try {
            let response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload
            });
            if(!response.ok) throw new Error("Authentication failed");
            
            const bodyResponse = await response.json();
            window.localStorage.setItem("token", bodyResponse.token);
            window.location.href = "../index.html";            
        } catch (error) {
            if(error.message) {
                console.error(error.message);
                allInputs.forEach(input => {
                    input.classList.add("incorrect");
                });
                if(emailInput.value !== "" || passwordInput.value !== "")
                    errors.push("Vos identifiants sont incorrects. ");
            } else {
                allInputs.forEach(input => {
                    input.classList.add("incorrect");
                });
                errors.push("Vos identifiants sont incorrects. ");
            }
        }
        if(errors.length > 0) {
            AUTH.removeErrors();
            if(errors.length > 0 && errors[1] === "Vos identifiants sont incorrects. ")
                errors.pop();
            errorMessage.innerText = errors.join("");
        }
    });
    },

    getLoginFormErrors: function(email, password) {
    let errors = [];

    if(email === "" || email == null) {
        errors.push("Saisissez vôtre E-mail. ");
        emailInput.classList.add("incorrect");
    }
    if(password === "" || password == null) {
        errors.push("Saisissez vôtre mot de passe. ");
        passwordInput.classList.add("incorrect");
    }

    return errors;
    },
    
    removeErrors: function() {
        allInputs.forEach(input => {
        input.addEventListener("input", () => {
            if(input.classList.contains("incorrect")) {
                input.classList.remove("incorrect");
                errorMessage.innerText = "";
            }
        });
    });
    },
};

