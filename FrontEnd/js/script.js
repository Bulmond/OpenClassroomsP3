import { works, generateWorks, createButtons} from "./modules/app.js";
import loginUser from "./modules/login.js";

const APP = (function () {
	if(location.pathname === "/FrontEnd/index.html") {
		generateWorks(works);
		createButtons();
	} else if(location.pathname === "/FrontEnd/pages/login.html") {
		loginUser();
	}
})();