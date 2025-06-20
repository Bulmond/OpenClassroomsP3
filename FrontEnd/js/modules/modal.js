import { fetchData, getWorks } from "./app.js";
export { getModal };

const url = "http://localhost:5678/api/works";
let works = await fetchData(url);

const getModal = function () {
    let modal = null;
    const modalOpen = document.querySelector("a.edition");
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
                document.querySelector(".modal-gallery").innerHTML = "";
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

        const modalGallery = document.querySelector(".modal-gallery");
        const container = document.createElement("div");
        container.classList.add("modal-image-container");

        const iconContainer = document.createElement("div");
        iconContainer.classList.add("modal-icon");
        addIconListener(iconContainer, work.id);
        /* console.log(works); */
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