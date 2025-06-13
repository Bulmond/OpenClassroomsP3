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

function filterButtons(works, categories) {
    for(let i = 0; i < categories.length; i++) {
        console.log(categories[i]);
        const filterDiv = document.querySelector(".filters");
        const buttonElement = document.createElement("button");
        buttonElement.dataset.id = categories[i].id;
        buttonElement.innerText = categories[i].name;

        filterDiv.appendChild(buttonElement);
    }

    console.log(buttonElement.innerText);
    /* buttonAll.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = "";
        generateWorks(works);
    });
    
    document.querySelector("#1").addEventListener("click", function () {
        const filteredWorks = works.filter(function (work) {
            return work.category.id == 1;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateWorks(filteredWorks);
    });
    
    document.querySelector("#3").addEventListener("click", function () {
        const filteredWorks = works.filter(function (work) {
            return work.category.id == 2;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateWorks(filteredWorks);
    });
    
    document.querySelector("#2").addEventListener("click", function () {
        const filteredWorks = works.filter(function (work) {
            return work.category.id == 3;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateWorks(filteredWorks);
    }); */
}

export {works, categories, generateWorks, filterButtons};