import { modelAddClock } from "../../../Model/worldclockModel.js";
import WorldclockModalView from "../../../View/Components/Modal/worldClockModalView.js";
import { controlLoadAllClocks } from "../CardList/worldclockCardListController.js";
const worldClockSectionEl = document.querySelector(".section-worldclock");

let View;

export const getWorldClockModalView = () => View;

const controlWorldClockModal = (action, clock_obj) => {
  if (action === "add-clock") modelAddClock(clock_obj);

  controlLoadAllClocks();
};

if (worldClockSectionEl) {
  View = new WorldclockModalView();
  View.addHandlerModal(controlWorldClockModal);
}
