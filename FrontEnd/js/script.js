import { works, categories, generateWorks, filterButtons} from "./modules/app.js";

const APP = (function () {
	generateWorks(works);
	filterButtons(works, categories);
})();