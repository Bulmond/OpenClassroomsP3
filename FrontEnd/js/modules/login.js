const emailInput = document.querySelector("[name=email]");
const passwordInput = document.querySelector("[name=password]");

let errors = [];
const errorMessage = document.createElement("p");
errorMessage.setAttribute("class","incorrect");

const LOGIN = (function (){
    function loginUser() {
    const loginForm = document.querySelector(".login-form");
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        errors = getLoginFormErrors(emailInput.value, passwordInput.value);

        const loginInfo = {
            email: emailInput.value,
            password: passwordInput.value
        };
        const payload = JSON.stringify(loginInfo);
        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload
            });
            
            if(response.ok) {
                const bodyResponse = await response.json();
                window.location.href = "../index.html";
            } else {
                const errorData = await response.json();
                throw errorData;
            }
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
                console.error("Unauthorized");
            }
        }
        if(errors.length > 0) {
            removeErrors();
            if(errors.length > 0 && errors[1] === "Vos identifiants sont incorrects. ")
                errors.pop();
            errorMessage.innerText = errors.join("");
            document.querySelector(".login").appendChild(errorMessage);
        }
    });
    }

    function getLoginFormErrors (email, password) {
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
    }

    const allInputs = [emailInput, passwordInput];
    function removeErrors() {
        allInputs.forEach(input => {
        input.addEventListener("input", () => {
            if(input.classList.contains("incorrect")) {
                input.classList.remove("incorrect");
                errorMessage.innerText = "";
            }
        });
    });
    }

    return {
        loginUser
    };
})();


export default LOGIN.loginUser;