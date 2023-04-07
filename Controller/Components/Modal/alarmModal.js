import AlarmModalView from "../../../View/Components/Modal/AlarmModalView.js";

import {
  modelUpdateAlarm,
  modelCreateAlarm,
  modelUpdateAlarmsTimingAndRemainingTimeProp,
  modelGetAlarmRemainingTime,
} from "../../../Model/alarmModel.js";
import { controlLoadAlarms } from "../CardList/alarmCardList.js";

// get u new remaining time from update alarm time

let View;
const alarmModal = document.querySelector(".alarm");

export const getAlarmModalView = () => View;

export const controlUpdateAlarm = (index, updateProp) => {
  const updateAlarm = modelUpdateAlarmsTimingAndRemainingTimeProp(updateProp);

  modelUpdateAlarm(index, updateAlarm);
};

export const controlAddAlarm = (index, alarm) => {
  const updatedAlarm = modelUpdateAlarmsTimingAndRemainingTimeProp(alarm);

  const newAlarmObj = immer.produce(updatedAlarm, (draft) => {
    draft.index = index;
  });

  modelCreateAlarm(newAlarmObj);
};

// function action on alarm obj in model
const controlAlarmModal = (action, index, updateProp) => {
  index = Number(index);

  if (action === "edit") controlUpdateAlarm(index, updateProp);

  if (action === "add") controlAddAlarm(index, updateProp);

  controlLoadAlarms();
};

if (alarmModal) {
  View = new AlarmModalView();
  View.addHandlerModal(controlAlarmModal);
}
