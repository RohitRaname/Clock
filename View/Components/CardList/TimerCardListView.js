import TimerCardView from "../Card/TimerCardView.js";
import { findEl } from "../../../utils/_domFunction.js";
import CardListView from "../../Common/CardListView.js";
import { formatCurTime } from "../../../utils/_helper.js";

class TimerListView extends CardListView {
  _parentEl = findEl("timer__list");

  // constructor() {
  //   super();
  //   this.addHandlerCardList();
  //   // this.render(timerState.timers);
  // }

  _generateMarkUpItem(timer) {
    return `<div
              class="card timerCard"
              data-name="${timer.name}"
              data-index=${timer.index}
              data-duration="${timer.duration}"
              data-remaining-time-str=${timer.remainingTimeStr}
              data-time-passed=${timer.timePassed}
              data-percent-completed=${timer.circlePercentCompleted}
              data-start="false"
              data-pause="false"
              data-expand="false"
              data-mini="false"
            >
            <header class="timerCard__header card-header mg-lw">
              <h8 class="h-8 timerCard__name"
                >${timer.name}
              </h8>
              <div class="timerCard__header-btns">
                <button
                  class="timerCard__header-btn card-header__btn btn-icon--square"
                  data-action="expand"
                >
                  <i class="fa fa-expand"></i>
                </button>

                <button
                  class="timerCard__header-btn card-header__btn btn-icon--square"
                  data-action="mini"
                >
                  <i class="icon fa fa-compress"></i>
                  <!-- <i class="fas fa-external-link-alt"></i> -->
                </button>
                <button
                  class="timerCard__header-btn card-header__btn btn-icon--square hidden"
                  data-action="delete"
                >
                  <!-- <i class="icon fa fa-compress"></i> -->
                  <i class="fas fa-trash-alt"></i>
                </button>

                <button
                  class="timerCard__header-btn card-header__btn btn-icon--square hidden"
                  data-action="normal"
                >
                  <i class="fas fa-arrows-alt"></i>
                </button>
              </div>
            </header>
            <div class="timerCard__time-box mg-sm">
              <div class="timerCard__time-figure"></div>

              <div class="flex-wrapper timerCard__time-percent ${
                timer.circlePercentCompleted > 0 ? "show" : ""
              }">
                <div class="single-chart">
                  <svg viewBox="0 0 36 36" class="circular-chart orange">
                    <path
                      class="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      class="circle timerFinishPercent"
                      stroke-dasharray="${timer.circlePercentCompleted}, 100"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <!-- <text x="18" y="20.35" class="percentage">30%</text> -->
                  </svg>
                </div>
              </div>
              <p class="timerCard__time-value timerCard__timer-leftTime">
             ${timer.remainingTimeStr}
              </p>
              <button
                class="timerCard__end-value timerCard__timer-End Time btn--grey btn--sm hidden"
              >
                <i class="fas fa-bell"></i>
                <span class="timerCard__timer-EndTime-value">${formatCurTime(
                  Date.now() + timer.duration
                )}</span>
              </button>
            </div>
            <div class="timerCard__footer">
              <button class="btn-icon--primary" data-action="start">
                <i class="fas icon fa-play" data-action="start"></i>
              </button>

              <button
                class="btn-icon--primary hidden"
                data-action="pause"
              >
                <i class="fas icon fa-pause" data-action="pause"></i>
              </button>

              <button class="btn-icon" data-action="reset" disabled>
                <i class="fas icon fa-circle-notch"></i>
              </button>
            </div>
          </div>`;
  }

  //////////////////////////////////////////////////////////
  addHandlerCardList(handle, TimerModalView,TimerView) {
    this._parentEl.addEventListener(
      "click",
      TimerCardView.handleCard.bind(TimerCardView, handle, TimerModalView,TimerView)
    );
  }

  ///////////////////////////////////////////////
}

export default TimerListView;
