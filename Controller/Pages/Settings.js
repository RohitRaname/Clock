import SettingsView from "../../View/Pages/SettingsView.js";
import { modelUpdateSettings } from "../../Model/settingsModel.js";

const settingsSectionEl = document.querySelector(".section-settings");

const controlSettings = (setting, value) => {
  modelUpdateSettings({ setting: value });
};

if (settingsSectionEl) {
  const View = new SettingsView();
  View.addHandlerSettings(controlSettings);
}
