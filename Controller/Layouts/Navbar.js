import NavBarView from "../../View/Layouts/NavBarView.js";

const navEl = document.querySelector(".nav");

const controlChangeSection = (section) => {
  setTimeout(() => {
    location.assign(`/${section}.html`);
  }, 300);
};

if (navEl) {
  const View = new NavBarView();
  const curSection = location.pathname.split(".")[0].slice(1);
  View.setCurrentSectionActive(curSection);

  View.addHandlerShowSection(controlChangeSection);
}
