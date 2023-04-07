import { findEl, closest } from "../../utils/_domFunction.js";
import ListView from "../Common/ListView.js";

class NavBarView extends ListView {
  _parentEl = findEl("nav-list");

  constructor() {
    super();
    this.handleList();
  }

  setCurrentSectionActive(section) {
    const navItemEls = [...this._parentEl.querySelectorAll(".nav-item")];

    navItemEls.forEach(
      (el) =>
        (el.dataset.active = el.dataset.section !== section ? false : true)
    );
  }

  addHandlerShowSection(handle) {
    this._parentEl.addEventListener("click", (e) => {
      const item = closest(e.target, "nav-item");
      if (!item) return;

      const { section } = item.dataset;

      handle(section);
    });
  }
}

export default NavBarView;
