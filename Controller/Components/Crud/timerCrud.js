import TimerCrudView from "../../../View/Components/Crud/TimerCrudView.js";
import { getTimerCardListView } from "../../Components/CardList/timerCardList.js";
import { getTimerModalView } from "../Modal/timerModal.js";

const timerCrudEl = document.querySelector('.crud-btns[data-page="timer"]');

const controlCrudBtns = (action) => {};

if (timerCrudEl) {
  let View = new TimerCrudView();

  const TimerCardListView = getTimerCardListView();
  const TimerModalView = getTimerModalView();

  View.addHandlerBtns(controlCrudBtns, TimerCardListView, TimerModalView);
}
