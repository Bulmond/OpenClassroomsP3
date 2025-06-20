import { fetchData } from "./app.js";
export { getModal };

const getModal = function () {
    let modal = null;
    const modalOpen = document.querySelector("a.edition");
    const openModal = function(e) {
        e.preventDefault();
        modal = document.querySelector(e.target.getAttribute("href"));
        modal.style.display = "flex";
        modal.addEventListener("click", closeModal);
        modal.querySelector(".modal-close").addEventListener("click", closeModal);
        modal.querySelector(".modal-stop").addEventListener("click", stopPropagation);
    }

    const closeModal = function (e) {
        if (modal === null) return;
        e.preventDefault();
        modal.style.display = "none";
        modal.removeEventListener("click", closeModal);
        modal.querySelector(".modal-close").removeEventListener("click", closeModal);
        modal.querySelector(".modal-stop").removeEventListener("click", stopPropagation);
        modal = null;
    }

    
    modalOpen.addEventListener("click", openModal);
    getModalWorks();
    
}

const stopPropagation = function(e) {
    e.stopPropagation();
}

async function getModalWorks() {
    const url = "http://localhost:5678/api/works";
    const works = await fetchData(url);
    for (let i = 0; i < works.length; i++) {
        const work = works[i];

        const modalGallery = document.querySelector(".modal-gallery");
        const container = document.createElement("div");  
        container.classList.add("modal-image-container");

        const iconContainer = document.createElement("div");
        iconContainer.classList.add("modal-icon");
        const iconElement = document.createElement("i");
        iconElement.classList.add("fa-solid", "fa-trash-can");
        
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;

        iconContainer.appendChild(iconElement);
        container.appendChild(iconContainer);
        container.appendChild(imageElement);
        modalGallery.appendChild(container);
    }
}