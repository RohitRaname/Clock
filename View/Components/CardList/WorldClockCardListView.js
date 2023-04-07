import TimerCardView from "../Card/TimerCardView.js";
import { findEl } from "../../../utils/_domFunction.js";
import CardListView from "../../Common/CardListView.js";
import { formatCurTime } from "../../../utils/_helper.js";

class WorldClockCardListView extends CardListView {
  _parentEl = findEl("worldclock-list");

  // constructor() {
  //   super();
  //   this.addHandlerCardList();
  //   // this.render(timerState.timers);
  // }

  _generateMarkUpItem(item) {
    const { index, day_state, time, location, date, time_comparision_str } =
      item;


    return `<div
              class="card worldclock-item"
              data-index="${index}"
              data-day-type="${day_state}"
              data-location=${location}
              >
                  <div class="worldclock-icon-box">
                    <button
                      class="card-header__btn card-deleteBtn btn-icon--square hidden"
                      data-action="delete-card">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                    <i class="fa fa-sun icon worldclock-day-icon" data-icon="day"></i>
                    <i class="fa fa-moon icon worldclock-day-icon" data-icon="night"></i>
                  </div>
                  <h5 class="h-5 mg-0 worldclock-item-time">${time}</h5>
                  <p class="p--md worldclock-item-location">${
                    location.split("/")[1]
                  }</p>
                  <p class="p--md worldclock-item-time-info">
                    <span class="t--md worldclock-item-date">${date}</span>
                    <span class="t--md worldclock-item-time-comparsion"
                      >${time_comparision_str}</span
                    >
              </p>
            </div>`;
  }

  //////////////////////////////////////////////////////////
  addHandlerCardList(handle, WorldCLockCardView) {
    this._parentEl.addEventListener(
      "click",
      WorldCLockCardView.handleCard.bind(WorldCLockCardView, handle)
    );
  }

  ///////////////////////////////////////////////
}

export default WorldClockCardListView;
