import AlarmCrudView from "../../../View/Components/Crud/AlarmCrudView.js";
import { getAlarmCardListView } from "../CardList/alarmCardList.js";
import { getAlarmModalView } from "../Modal/alarmModal.js";

const timerCrudEl = document.querySelector('.crud-btns[data-page="alarm"]');

const controlCrudBtns = (action) => {};

if (timerCrudEl) {
  let View = new AlarmCrudView();

  const AlarmCardListView = getAlarmCardListView();
  const AlarmModalView = getAlarmModalView();

  View.addHandlerBtns(controlCrudBtns, AlarmCardListView, AlarmModalView);
  // View.addHandlerBtns(controlCrudBtns, AlarmCardListView);
}
