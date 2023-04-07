import StopWatchView from "../../View/Pages/StopWatchView.js";
import {
  modelAddTimeMarked,
  modelGetStopwatch,
  modelGetTimerMarkedArrWithFastestAndSlowestTimeMarkedMention,
  modelUpdateTimeProps,
} from "../../Model/stopwatchModel.js";
const stopwatchEl = document.querySelector(".stopwatch");

let View;

export const controlRenderTimeMarkedList = (time_marked_arr) => {
  View.renderTimeMarkedList(time_marked_arr);
};

const controlAddTimeMarkedObj = (time_marked_obj) => {
  modelAddTimeMarked(time_marked_obj);
};

const controlStopwatch = (action, updatePropObj) => {
  if (action === "update-time-props") modelUpdateTimeProps(updatePropObj);

  if (action === "add-time-marked") controlAddTimeMarkedObj(updatePropObj);

  controlRenderTimeMarkedList(
    modelGetTimerMarkedArrWithFastestAndSlowestTimeMarkedMention()
  );
};

if (stopwatchEl) {
  View = new StopWatchView();
  View.addHandlerStopWatch(controlStopwatch);
}
