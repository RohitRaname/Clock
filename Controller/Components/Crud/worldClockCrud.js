import WorldclockCrudView from "../../../View/Components/Crud/worldclockCrudView.js";
import { getWorldClockCardListView } from "../CardList/worldclockCardListController.js";
import { getWorldClockModalView } from "../Modal/worldclockModal.js";

let View;

const worldclockSectionEl = document.querySelector(".section-worldclock");

export const controlWorldClockModal = () => {};

if (worldclockSectionEl) {
  View = new WorldclockCrudView();
  View.addHandlerBtns(
    controlWorldClockModal,
    getWorldClockCardListView(),
    getWorldClockModalView()
  );
}
