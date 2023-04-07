import { findEl } from "../../../utils/_domFunction.js";
import CardListView from "../../Common/CardListView.js";
import { formatCurTime } from "../../../utils/_helper.js";

class AlarmListView extends CardListView {
  _parentEl = findEl("alarm__list");

  // constructor() {
  //   super();
  //   this.addHandlerCardList();
  //   // this.render(timerState.timers);
  // }

  _generateMarkUpItem(alarm) {

    // the only imformation i need in data-attribute is INDEX n
    // NO more No LESSSSSSSSSSSSSSSSSSS||||||||||||!!!!!!!!
    // data-alarm-tunes='${JSON.stringify(alarm.alarm_tunes)}'

    return `   
          <div
            class="card alarm-card"
            data-name="${alarm.name}"
            data-index="${alarm.index}"
            data-time="${alarm.time}"
            data-remaining-time="${alarm.remainingTimeStr}"
            data-type="alarm"
            data-active="${alarm.active}"
            data-alarm-tune="${alarm.alarm_tune}"
            data-alarm-repeat-time-period=${alarm.alarm_repeat_time_period}
            data-alarm-days='${JSON.stringify(alarm.alarm_days)}'

            
          >
            <button
              class="card-deleteBtn btn-icon--square hidden"
              data-action="delete"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
            <button
              class="alarm-btn alarm-startAndpauseBtn"
              data-action="start&pause"
              data-active="${alarm.active}"
            >
              <i class="fas fa-circle"></i>
            </button>

            <h1 class="h-1 alarm-time">${alarm.time}</h1>
            <p class="text-lw alarm-remainingTime">
              <i class="fas fa-bell"></i>
              in
              <span class="alarm-remainingTime__value"
                >${alarm.remainingTimeStr}</span
              >
            </p>
            <h5 class="h-5 alarm-name mg-lw">${alarm.name}</h5>

            <div class="alarm-days">
              ${
                alarm.alarm_days.map(
                (alarm_day) => `      
                <button
                  class="alarm-dayBtn btn-icon--primary"
                  data-day=${alarm_day.day}
                  data-active="${alarm_day.active}"
                >
                  <span class="alarm-dayName">${alarm_day.day}</span>
                </button>`
              ).join("")
              }
            </div>
          </div>`;
  }

  //////////////////////////////////////////////////////////
  addHandlerCardList(handle, AlarmCardView, AlarmModalView) {
    this._parentEl.addEventListener(
      "click",
      AlarmCardView.handleCard.bind(AlarmCardView, handle, AlarmModalView)
    );
  }

  ///////////////////////////////////////////////
}

export default AlarmListView;
