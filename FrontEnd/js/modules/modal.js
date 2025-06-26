import { APP } from "./app.js";
export { MODAL };

const url = "http://localhost:5678/api/works";
let works = await APP.fetchData(url);
let categories = await APP.fetchData("http://localhost:5678/api/categories");

const MODAL = {
    getModal: function () {
        let modal = null;
        const modalOpen = document.querySelector("a.edition");
        const openModal = function (e) {
            e.preventDefault();
            modal = document.querySelector(e.target.getAttribute("href"));
            modal.style.display = "flex";
            modal.addEventListener("click", closeModal);
            modal.querySelector(".modal-close").addEventListener("click", closeModal);
            modal.querySelector(".modal-stop").addEventListener("click", MODAL.stopPropagation);
        }

        const closeModal = function (e) {
            if (modal === null) return;
            e.preventDefault();
            modal.style.display = "none";
            modal.removeEventListener("click", closeModal);
            modal.querySelector(".modal-close").removeEventListener("click", closeModal);
            modal.querySelector(".modal-stop").removeEventListener("click", MODAL.stopPropagation);
            modal = null;
        }


        modalOpen.addEventListener("click", openModal);
        MODAL.getModalWorks(works);
        const modalButton = document.querySelector(".modal-button");
        modalButton.addEventListener("click", MODAL.getNewWorks);

    },

    stopPropagation: function (e) {
        e.stopPropagation();
    },

    addIconListener: function (iconContainer, id) {
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
                console.log(`(id:${id}) deleted succesfully`);
                newWorks = await APP.fetchData(url);
                document.querySelector(".gallery").innerHTML = "";
                APP.getWorks(newWorks);
                document.querySelector(".modal-content").innerHTML = "";
                MODAL.getModalWorks(newWorks);
                document.querySelector(".modal-button").addEventListener("click", MODAL.getNewWorks);
                if (!res.ok) throw new Error("Failed to delete work");
            } catch (error) {
                console.warn(error.mes);
            }
        });
    },

    getModalWorks: function (works) {
        const modalTitle = document.createElement("h3");
        modalTitle.classList.add("modal-title");
        modalTitle.innerText = "Galerie photo"

        const modalGallery = document.createElement("div");
        modalGallery.classList.add("modal-gallery");

        const modalSeparator = document.createElement("hr");

        const modalButton = document.createElement("Button");
        modalButton.classList.add("modal-button");
        modalButton.innerText = "Ajouter une photo"
        for (let i = 0; i < works.length; i++) {
            const work = works[i];

            const container = document.createElement("div");
            container.classList.add("modal-image-container");

            const iconContainer = document.createElement("div");
            iconContainer.classList.add("modal-icon");
            MODAL.addIconListener(iconContainer, work.id);

            const iconElement = document.createElement("i");
            iconElement.classList.add("fa-solid", "fa-trash-can");

            const imageElement = document.createElement("img");
            imageElement.src = work.imageUrl;

            iconContainer.appendChild(iconElement);
            container.appendChild(iconContainer);
            container.appendChild(imageElement);
            modalGallery.appendChild(container);
        }
        document.querySelector(".modal-content").append(modalTitle, modalGallery, modalSeparator, modalButton);
    },

    getNewWorks: function () {
        const modalContent = document.querySelector(".modal-content");
        modalContent.innerHTML = "";
        const modalForm = MODAL.getModalForm();
        const modalTitle = document.createElement("h3");
        modalTitle.classList.add("modal-title");
        modalTitle.innerText = "Ajout photo"

        const modalSeparator = document.createElement("hr");

        const formSubmit = document.createElement("input");
        formSubmit.setAttribute("type", "submit");
        formSubmit.classList.add("modal-button");
        formSubmit.innerText = "Valider";

        const modalBack = document.querySelector(".modal-back");
        modalBack.style.display = "inline-block";
        modalBack.addEventListener("click", MODAL.getPreviousPage);

        modalForm.append(modalSeparator, formSubmit);
        modalContent.append(modalTitle ,modalForm);
        modalForm.addEventListener("submit", MODAL.submitModalForm);
    },

    submitModalForm: async function (e) {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append("title", document.getElementById("title").value);
        formData.append("category", document.getElementById("category").value);
        formData.append("image", document.getElementById("image-upload").files[0]);
        try {
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.token}`
                },
                body: formData
        });
            if (!res.ok) throw new Error("Work was not added to the gallery");
        } catch (err) {
            console.warn(err.message);
        }
        return false;
    },

    getPreviousPage: function () {
        document.querySelector(".modal-back").removeEventListener("click", MODAL.getPreviousPage);
        document.querySelector(".modal-content").innerHTML = "";
        MODAL.getModalWorks(works);
        document.querySelector(".modal-button").addEventListener("click", MODAL.getNewWorks);
    },

    getModalForm: function () {
        const modalForm = document.createElement("form");
        modalForm.setAttribute("id", "add-work");
        modalForm.setAttribute("name", "add-work");
        modalForm.setAttribute("action", "./index.html");
        modalForm.setAttribute("enctype", "multipart/form-data");
        const formImage = MODAL.getFormImageEl();
        const formInput = MODAL.getFormInputEl();

        modalForm.append(formImage, formInput);
        return modalForm;
    },

    getFormInputEl: function () {
        const formInputElement = document.createElement("div");
        formInputElement.classList.add("form-input");

        /* Form Labels */
        const formTitleLabel = document.createElement("label");
        const formCategoryLabel = document.createElement("label");

        formTitleLabel.setAttribute("for", "title");
        formTitleLabel.innerText = "Titre";

        formCategoryLabel.setAttribute("for", "category");
        formCategoryLabel.innerText = "Catégorie";

        /* Form Inputs*/
        const formTitleInput = document.createElement("input");
        const formCategoryInput = document.createElement("select");

        formTitleInput.setAttribute("type", "text");
        formTitleInput.setAttribute("name", "title");
        formTitleInput.setAttribute("id", "title");
        formTitleInput.setAttribute("required", "");

        formCategoryInput.setAttribute("id", "category");
        formCategoryInput.setAttribute("name", "category")
        const defaultOption = document.createElement("option");
        formCategoryInput.appendChild(defaultOption);

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const selectOption = document.createElement("option");
            selectOption.setAttribute("value", category.id);
            selectOption.innerText = category.name;
            formCategoryInput.appendChild(selectOption);
        }

        formInputElement.append(formTitleLabel, formTitleInput, formCategoryLabel, formCategoryInput);
        return formInputElement;
    },

    getFormImageEl: function () {
        const formImageElement = document.createElement("div");
        formImageElement.classList.add("form-image");

        const formImagePreview = document.createElement("img");
        formImagePreview.style.display = "none"

        const formImageIcon = document.createElement("i");
        formImageIcon.classList.add("fa-regular", "fa-image");

        const formImageInput = document.createElement("input");
        formImageInput.setAttribute("required", "");
        formImageInput.setAttribute("id", "image-upload");
        formImageInput.setAttribute("type", "file");
        formImageInput.setAttribute("accept", "image/jpg, image/png");
        formImageInput.setAttribute("name", "imageUrl")

        const formImageLabel = document.createElement("label");
        formImageLabel.setAttribute("for", "image-upload");
        formImageLabel.innerText = "+ Ajouter photo"

        const formImageSpan = document.createElement("span");
        formImageSpan.innerText = "jpg, png : 4mo max";

        formImageInput.addEventListener("input", () => {
            const fileUrl = URL.createObjectURL(formImageInput.files[0]);
            formImagePreview.src = fileUrl;
            formImagePreview.style.display = "block";
            formImageIcon.style.display = "none";
            formImageLabel.style.display = "none";
            formImageSpan.style.display = "none";
        })
        formImageElement.append(formImagePreview, formImageIcon, formImageLabel, formImageInput, formImageSpan);
        return formImageElement;
    },
};

