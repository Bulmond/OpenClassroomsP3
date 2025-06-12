const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

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

generateWorks(works);