import { getWorks, getButtons, fetchData, getAdmin} from "./modules/app.js";
import loginUser from "./modules/login.js";

const APP = (async function () {
	const works = await fetchData("http://localhost:5678/api/works");
	const token = window.localStorage.getItem("token");
	/* getAdmin(); */
	switch (true) {
		case location.pathname === "/FrontEnd/index.html" && token !== null:
			getWorks(works);
			getAdmin();
			break;
		case location.pathname === "/FrontEnd/index.html":
			getWorks(works);
			getButtons();
			break;
		
		case location.pathname === "/FrontEnd/pages/login.html":
			loginUser();
			break;

		default:
			break;
	}
})();