import AlarmCompletedPopupView from "../../../View/Components/AlarmRarelyUsedComponent/AlarmCompletedPopupView.js";
import { controlLoadAlarms } from "../CardList/alarmCardList.js";
import {
  modelSetAlarmDayCompleted,
  modelIncreaseAlarmDayRingTime,
  modelReplaceAlarm,
} from "../../../Model/alarmModel.js";

const controlDismissAlarm = (propObj) => {
  const { index, day } = propObj;
  modelSetAlarmDayCompleted(index, day);
};

const controlSnoozeAlarm = (propObj) => {
  const { index, day, snoozeTimePeriod } = propObj;
  const updateAlarm = modelIncreaseAlarmDayRingTime(
    index,
    day,
    Number(snoozeTimePeriod)
  );
  modelReplaceAlarm(index - 1, updateAlarm);
};

const controlAlarmCompleted = (action, propObj) => {
  if (action === "dismiss-alarm") controlDismissAlarm(propObj);

  if (action === "snooze-alarm-time") controlSnoozeAlarm(propObj);

  controlLoadAlarms();
};

export const controlLoadAlarmCompletedPopup = (index, day, tune) => {
  const View = new AlarmCompletedPopupView();
  const alarmObj = { index, day };
  View.render(alarmObj);
  View._show(tune);
  View.addHandlerPopup(controlAlarmCompleted);
};
