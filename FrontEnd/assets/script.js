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

const buttonAll= document.querySelector(".btn-all")

buttonAll.addEventListener("click", function () {
	document.querySelector(".gallery").innerHTML = "";
	generateWorks(works);
});

const buttonObj = document.querySelector(".btn-objects")

buttonObj.addEventListener("click", function () {
	const filteredWorks = works.filter(function (work) {
		return work.category.id == 1;
	});
	document.querySelector(".gallery").innerHTML = "";
    console.log(filteredWorks);
	generateWorks(filteredWorks);
});

const buttonApts = document.querySelector(".btn-apts")

buttonApts.addEventListener("click", function () {
	const filteredWorks = works.filter(function (work) {
		return work.category.id == 2;
	});
	document.querySelector(".gallery").innerHTML = "";
    console.log(filteredWorks);
	generateWorks(filteredWorks);
});

const buttonHotels = document.querySelector(".btn-hotels")

buttonHotels.addEventListener("click", function () {
	const filteredWorks = works.filter(function (work) {
		return work.category.id == 3;
	});
	document.querySelector(".gallery").innerHTML = "";
    console.log(filteredWorks);
	generateWorks(filteredWorks);
});