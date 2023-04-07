import { addClass, closest } from "../../utils/_domFunction.js";

class ListView {
  _parentEl;

  _getAllItems() {
    return [...this._parentEl.querySelectorAll(".list-item")];
  }

  _setItemActive(target) {
    let { active } = target.dataset;
    active = active === "true" ? "false" : "true";

    const itemEls = this._getAllItems();
    for (const el of itemEls) el.dataset.active = false;
    target.dataset.active = active;
  }

  handleList() {
    this._parentEl.addEventListener("click", (e) => {
      const target = closest(e.target, "list-item");
      if (!target) return;

      this._setItemActive(target);
    });
  }
}

export default ListView;
