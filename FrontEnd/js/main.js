import { APP } from "./modules/app.js";
import { AUTH } from "./modules/auth.js";
import { MODAL } from "./modules/modal.js"

const MAIN = (async function () {
	let works = await APP.fetchData("http://localhost:5678/api/works");
	const token = window.localStorage.getItem("token");
	switch (true) {
		case location.pathname === "/FrontEnd/index.html" && token !== null:
			APP.getWorks(works);
			APP.getAdmin();
			MODAL.getModal();
			break;
		case location.pathname === "/FrontEnd/index.html":
			APP.getWorks(works);
			APP.getButtons();
			break;
		
		case location.pathname === "/FrontEnd/pages/login.html":
			AUTH.authUser();
			break;

		default:
			break;
	}
})();