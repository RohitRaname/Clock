class DropdownView {
  _dropdownEl;
  _dropdownParentEl;
  _dropdownParentInputEl;

  _hideManually;

  constructor() {}

  show() {
    this._dropdownParentEl.dataset.active = true;
  }

  _hide() {
    this._dropdownParentEl.dataset.active = false;
  }

  render(arr) {
    const dropdownListEl = this._dropdownEl.querySelector(".list");
    dropdownListEl.innerHTML = "";

    const html = arr
      .map(
        (el) =>
          `
      <div class="list-item" data-active="false" data-value="${el}">
        ${el}
        </div>
      `
      )
      .join("");

    dropdownListEl.insertAdjacentHTML("afterbegin", html);
  }

  _handleSelectItem(target) {
    const item = target.closest(".list-item");
    if (!item) return;

    let { active, value } = target.dataset;
    if (value === "No matches found!") return;

    // active = active === "true" ? "false" : "true";
    active = true;

    const allItemEls = [...this._dropdownEl.querySelectorAll(".list-item")];
    allItemEls.forEach((el) => {
      if (el !== item) el.dataset.active = "false";
    });

    item.dataset.active = active;

    // determining if input el is input or p el where we have data-value instead of value

    const elType = this._dropdownParentInputEl.nodeName.toLowerCase();
    if (elType === "input") this._dropdownParentInputEl.value = value;
    else {
      this._dropdownParentInputEl.dataset.value = value;
      this._dropdownParentInputEl.textContent = value;
    }

    if (this._hideManually) return;
    this._hide();
  }

  handleDropdown(dropdownEl, hideManually = false) {
    this._hideManually = hideManually ? true : false;

    this._dropdownEl = dropdownEl;
    if (this._dropdownEl.dataset.clickEvent === "true") return;
    this._dropdownParentEl = this._dropdownEl.closest(".dropdown-parent");
    this._dropdownParentInputEl = this._dropdownParentEl.querySelector(
      ".dropdown-parent-input"
    );
    this._dropdownEl.dataset.clickEvent = true;

    this._dropdownEl.addEventListener("click", (e) => {
      const target = e.target;

      this._handleSelectItem(target);
    });
  }
}

export default DropdownView;
