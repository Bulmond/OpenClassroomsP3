import { fetchData, getWorks } from "./app.js";
export { getModal };

const url = "http://localhost:5678/api/works";
let works = await fetchData(url);

const getModal = function () {
    let modal = null;
    const modalOpen = document.querySelector("a.edition");
    const newWorksButton = document.querySelector(".modal-button");
    const openModal = function (e) {
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
    newWorksButton.addEventListener("click", getNewWorks);
    getModalWorks(works);

}

const stopPropagation = function (e) {
    e.stopPropagation();
}

function addIconListener(iconContainer, id) {
    let newWorks = null;
    iconContainer.addEventListener("click", async () => {
        try {
            const res = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "accept": "*/*",
                    "Authorization": `Bearer ${localStorage.token}`
                }
            });
            if (res.ok) {
                console.log(`(id:${id}) deleted succesfully`);
                newWorks = await fetchData(url);
                //console.log(newWorks);
                document.querySelector(".gallery").innerHTML = "";
                getWorks(newWorks);
                document.querySelector(".modal-content").innerHTML = "";
                getModalWorks(newWorks);
            }
        } catch (error) {
            console.error(error);
        }
    });
}

function getModalWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const work = works[i];

        const modalGallery = document.querySelector(".modal-content");
        const container = document.createElement("div");
        container.classList.add("modal-image-container");

        const iconContainer = document.createElement("div");
        iconContainer.classList.add("modal-icon");
        addIconListener(iconContainer, work.id);

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

function getNewWorks() {
    document.querySelector(".modal-title").innerText = "Ajout photo";
    document.querySelector(".modal-button").innerText = "Valider";
    document.querySelector(".modal-button").removeEventListener("click", getNewWorks);

    const modalBack = document.querySelector(".modal-back");
    modalBack.style.display = "inline-block";

    
    const modalContent = document.querySelector(".modal-content");
    modalContent.classList.add("modal-form");
    modalContent.innerHTML = "";
    modalBack.addEventListener("click",getPreviousPage);

    getModalForm();
}

function getPreviousPage() {
    document.querySelector(".modal-back").removeEventListener("click",getPreviousPage);
    document.querySelector(".modal-title").innerText = "Galerie photos";
    document.querySelector(".modal-button").innerText = "Ajouter une photo";
    document.querySelector(".modal-content").innerHTML = "";
    document.querySelector(".modal-content").classList.remove("modal-form")
    getModalWorks(works);
    document.querySelector(".modal-button").addEventListener("click", getNewWorks);
}

function getModalForm() {
    getFormDiv();
}

function getFormDiv() {
    const newPhotoDiv = document.createElement("div");
    newPhotoDiv.classList.add("modal-new-photo");

    const newPhotoIcon = document.createElement("i");
    newPhotoIcon.classList.add("fa-regular", "fa-image");

    const newPhotoButton = document.createElement("button");
    newPhotoButton.innerText = "+ Ajouter photo";

    const newPhotoSpan = document.createElement("span");
    newPhotoSpan.innerText = "jpg, png : 4mo max";

    newPhotoDiv.append(newPhotoIcon, newPhotoButton, newPhotoSpan);
    document.querySelector(".modal-content").appendChild(newPhotoDiv)
}