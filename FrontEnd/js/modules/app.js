async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function getWorks(works) {
    for(let i = 0; i < works.length; i++) {
        const figure = works[i];
        const galleryDiv = document.querySelector(".gallery");
        const workElement = document.createElement("figure");
        workElement.dataset.id = works[i].id;
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = figure.title;

        galleryDiv.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(captionElement);
    }
}

async function buttonEventListener(button, category) {
    const url = "http://localhost:5678/api/works";
    const works = await fetchData(url);

    button.addEventListener("click", function () {
        const filteredWorks = works.filter(function (work) {
            return work.category.name == category;
        });
        document.querySelector(".gallery").innerHTML = "";
        if(category === "All")
            getWorks(works);
        else
            getWorks(filteredWorks);
    });
}

async function getButtons() {
    const url = "http://localhost:5678/api/categories";
    let categories = await fetchData(url);

    const categoryNames = categories.map(category => category.name);

    const filterDiv = document.querySelector(".filters");
    const buttonElement = document.createElement("button");
    buttonElement.setAttribute("class", "All")
    buttonElement.innerText = "Tous";

    filterDiv.appendChild(buttonElement);
    buttonEventListener(buttonElement, "All");

    for(let i = 0; i < categories.length; i++) {
        const filterDiv = document.querySelector(".filters");
        const buttonElement = document.createElement("button");
        buttonElement.setAttribute("class", `${categoryNames[i]}`);
        buttonElement.innerText = categories[i].name;

        filterDiv.appendChild(buttonElement);
        buttonEventListener(buttonElement, categoryNames[i]);
    }
}

function getAdminElements() {
    const fixedHeader = document.createElement("div");
    fixedHeader.setAttribute("class", "edition");

    const headerText = document.createElement("p");
    headerText.innerText = "Mode édition";

    const editionIcon = [document.createElement("i"), document.createElement("i")];
    editionIcon.forEach (icon => {
        icon.classList.add("fa-regular", "fa-pen-to-square");
    })

    fixedHeader.prepend(editionIcon[0]);
    fixedHeader.appendChild(headerText);
    document.querySelector("html").prepend(fixedHeader);

    const logoutButton = document.querySelector("#login a");
    logoutButton.innerText = "logout";
    logoutButton.href = "index.html";
    logoutButton.addEventListener("click", () => {
        window.localStorage.removeItem("token");
    });

    const editorLink = document.createElement("a");
    editorLink.href = "#";
    editorLink.setAttribute("class", "edition")
    editorLink.innerText = "modifier"

    editorLink.prepend(editionIcon[1]);
    document.querySelector(".section-title").appendChild(editorLink);
}

function getAdmin() {
    getAdminElements();

}

export { getWorks, getButtons, fetchData, getAdmin};