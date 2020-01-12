import "./index.scss";

import Home from "./views/Home";
import Merong from "./views/Merong";
import NotFound from "./views/NotFound";

import utils from "./libs/utils";

const routes = {
  "/": Home,
  "/merong": Merong
};

const router = async () => {
  const container = document.getElementById("container");
  const request = utils.parseRequestURL();
  const parsedURL =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  const page = routes[parsedURL] ? routes[parsedURL] : NotFound;

  container.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
