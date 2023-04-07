"use strict";
import AlarmCardView from "../../../View/Components/Card/AlarmCardView.js";
import { controlLoadAlarmCompletedPopup } from "../Popup/AlarmCompletedPopupController.js";
import {
  modelGetAlarmRemainingTime,
  modelUpdateAlarm,
  modelDeleteAlarm,
  modelGetAllAlarms,
} from "../../../Model/alarmModel.js";
import { getCurDay } from "../../../utils/_helper.js";
import { controlLoadAlarms } from "../CardList/alarmCardList.js";

const alarmSection = document.querySelector(".section-alarm");
let View;

export const controlAlarm = (action, alarm_index) => {
  if (action === "start-alarm") modelUpdateAlarm(alarm_index, { active: true });

  if (action === "pause-alarm")
    modelUpdateAlarm(alarm_index, { active: false });

  if (action === "delete-alarm") modelDeleteAlarm(alarm_index);

  controlLoadAlarms();
};

// dependent ---------------------------
const controlAlarmSettings = (alarm) => {
  let active, ring_once, alarm_days;

  let { remainingTimeInSec, remainingTimeStr } = modelGetAlarmRemainingTime(
    alarm.index
  );

  remainingTimeInSec = Number(remainingTimeInSec);

  // check if alarm complete and then  alarming user alarm has completed
  if (remainingTimeInSec <= 0 && alarm.active === true) {
    const cur_day = getCurDay();

    controlLoadAlarmCompletedPopup(alarm.index, cur_day, alarm.alarm_tune);
  }

  if (remainingTimeInSec <= 0 && alarm.ring_once) {
    ring_once = false;
    active = false;
  }



  return {
    remainingTimeInSec,
    remainingTimeStr,
    alarm_days,
    ring_once,
    active,
  };
};

export const controlUpdateAlarmTime = (alarm) => {
  const updatedProp = controlAlarmSettings(alarm);
  modelUpdateAlarm(alarm.index, updatedProp);
  return modelGetAllAlarms();
};
// ------------------------------------------------------

export const getAlarmCardView = () => View;

if (alarmSection) {
  View = new AlarmCardView();
}
