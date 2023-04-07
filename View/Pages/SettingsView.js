import DropdownView from "../Common/DropdownView.js";

class SettingsView {
  _parentEl = document.querySelector(".settings");
  _dropdownEl = this._parentEl.querySelector(".dropdown");

  _settingItemInputEl = this._parentEl.querySelector(".setting-item-input");

  addHandlerSettings(handle) {
    const View = new DropdownView();
    View.handleDropdown(this._dropdownEl, true);

    this._parentEl.addEventListener("click", (e) => {
      const target = e.target;
      const itemEl = target.closest(".setting-item");
      if (!itemEl) return;

      // select dropdown item
      if (target.closest(".dropdown")) {
        document.documentElement.dataset.theme =
          this._settingItemInputEl.dataset.value;
        return;
      }

      
      // close or open dropdown when clicking setting-item-content
      let { active } = itemEl.dataset;
      active = active === "true" ? "false" : "true";
      itemEl.dataset.active = active;

      // check if setting is changed
      const { setting, value } = this._settingItemInputEl.dataset;
      // setting theme in view

      const previousSettingValue = itemEl.dataset.settingValue;
      if (previousSettingValue === value) return;
      itemEl.dataset.settingValue = value;
      handle(setting, value);
    });
  }
}

export default SettingsView;
