import { works, generateWorks, createButtons} from "./modules/app.js";

const APP = (function () {
	generateWorks(works);
	createButtons();
})();