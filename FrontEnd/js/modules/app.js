const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();
const responseCategories = await fetch("http://localhost:5678/api/categories")
const categories = await responseCategories.json();

function generateWorks(works) {
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

function buttonEventListener(button, category) {
    button.addEventListener("click", function () {
        const filteredWorks = works.filter(function (work) {
            return work.category.name == category;
        });
        document.querySelector(".gallery").innerHTML = "";
        if(category === "All")
            generateWorks(works);
        else
            generateWorks(filteredWorks);
    });
}

function createButtons() {
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

export {works, generateWorks, createButtons};