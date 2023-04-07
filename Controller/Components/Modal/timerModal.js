import TimerModalView from "../../../View/Components/Modal/TimerModalView.js";
import { controlLoadTimers } from "../CardList/timerCardList.js";
import {
  modelGetTimerByIndex,
  modelUpdateTimerByIndex,
  modelDeleteTimerByIndex,
  modelCreateTimer,
} from "../../../Model/timerModel.js";

let View;
const timerModal = document.querySelector(".timer");

export const getTimerModalView = () => View;

export const controlEditTimer = (index, updateProp) => {
  updateProp.timePassed = 0;
  updateProp.circlePercentCompleted = 0;
  modelUpdateTimerByIndex(index, updateProp);
};

export const controlDeleteTimer = (index) => modelDeleteTimerByIndex(index);

export const controlAddTimer = (index, updateProp) => {
  updateProp.index = index;
  modelCreateTimer(updateProp);
};

const controlTimerModal = (action, index, updateProp) => {
  index = Number(index);

  console.log(action, index, updateProp);

  // update time by index
  if (action === "edit") controlEditTimer(index, updateProp);

  // delete timer by index
  if (action === "delete") controlDeleteTimer(index);

  if (action === "add") controlAddTimer(index, updateProp);
  console.log(modelGetTimerByIndex(index));
  controlLoadTimers();
};

if (timerModal) {
  View = new TimerModalView();
  View.addHandlerModal(controlTimerModal);
}
