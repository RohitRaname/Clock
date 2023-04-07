import TimerCardListView from "../../../View/Components/CardList/TimerCardListView.js";
import { getTimerView } from "../../Pages/Timer.js";
import { getTimerModalView } from "../Modal/timerModal.js";
import { modelDeleteTimer, modelGetTimer } from "../../../Model/timerModel.js";

import {
  modelGetAllTimers,
  modelUpdateTimer,
} from "../../../Model/timerModel.js";

const TimerCardListEl = document.querySelector(".timer");

let View;

export const getTimerCardListView = () => View;

export const controlLoadTimers = () => {
  const timers = modelGetAllTimers();
  View.render(timers);
};

const controlTimerCardList = (action, timerName, timerUpdateProp) => {
  console.log(action, timerName, timerUpdateProp);
  if (action === "pause-timer") modelUpdateTimer(timerName, timerUpdateProp);

  if (action === "reset-timer") modelUpdateTimer(timerName, timerUpdateProp);

  if (action === "delete-timer") modelDeleteTimer(timerName);
  controlLoadTimers();
};

if (TimerCardListEl) {
  View = new TimerCardListView();
  controlLoadTimers();
  // manageCard

  const TimerView = getTimerView();
  const TimerModalView = getTimerModalView();

  View.addHandlerCardList(controlTimerCardList, TimerModalView, TimerView);
}
