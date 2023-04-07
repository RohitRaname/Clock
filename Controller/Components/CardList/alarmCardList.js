import AlarmCardListView from "../../../View/Components/CardList/AlarmCardListView.js";
import { controlAlarm, getAlarmCardView } from "../Card/alarmCard.js";
import { controlUpdateAlarmTime } from "../Card/alarmCard.js";
import { getAlarmModalView } from "../Modal/alarmModal.js";
import {
  modelGetAllAlarms,
  modelResetAllAlarmsCompleteStateEveryWeek,
  modelSetAlarmAllDaysTiming,
} from "../../../Model/alarmModel.js";

const alarmListEl = document.querySelector(".alarm__list");
let View;

export const controlLoadAlarms = () => {
  const alarmsArr = modelGetAllAlarms();

  View.render(alarmsArr);
};

export const getAlarmCardListView = () => View;

// // this function should be written in alarmCardView
// const controlAlarms = (action,alarm_index) => {

// };

const inititalAlarmsRender = () => {
  const alarmsArr = modelGetAllAlarms();
  alarmsArr.forEach((alarm) => {
    modelSetAlarmAllDaysTiming(alarm.index, alarm.time,true);
    const updatedAlarmArr = controlUpdateAlarmTime(alarm);

    View.render(updatedAlarmArr);
  });
};

const controlUpdateAlarmsTime = () => {
  inititalAlarmsRender();
  const setInterValID = setInterval(() => {
    const alarmsArr = modelGetAllAlarms();
    alarmsArr.forEach((alarm) => {
      const updatedAlarmArr = controlUpdateAlarmTime(alarm);
      View.render(updatedAlarmArr);
    });
  }, 60 * 1000);
};

if (alarmListEl) {
  View = new AlarmCardListView();

  controlLoadAlarms();

  // update time every minute
  controlUpdateAlarmsTime();

  // reset alarm completed state every week
  modelResetAllAlarmsCompleteStateEveryWeek();

  //////////////////////////////////////////////////////
  const AlarmCardView = getAlarmCardView();
  const AlarmModalView = getAlarmModalView();
  View.addHandlerCardList(controlAlarm, AlarmCardView, AlarmModalView);
}
