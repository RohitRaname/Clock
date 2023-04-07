import TimerView from "../../View/Pages/TimerView.js";
const sectionTimer = document.querySelector(".section-timer");

let View;

export const getTimerView = () => View;

if (sectionTimer) {
  View = new TimerView();
}
