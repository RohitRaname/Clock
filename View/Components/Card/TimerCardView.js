"use strict";

// import AddTimerView from "../Modal/Timer/AddTimerView.js";
import { formatTime, formatCurTime } from "../../../utils/_helper.js";
import CardView from "../../Common/CardView.js";

class TimerCardView extends CardView {
  //////////////////////////////////////
  _parentEl;
  _percentageCircleEl;
  _percentageCircleControllerEl;
  _timeValueEl;
  resetBtn;
  startBtn;

  _percentageCircleSettimeoutID;
  // it compare the last left time with actual duration so we can know how much time is left for timer to complete
  _duration = 0;
  _timePassed = 0;
  _remainingTimeStr;
  _circleCompletedPercent = 0;
  _timerName;

  // other class dependent on

  // function provided by controller

  constructor() {
    super();
  }

  //////////////////////////////////////////////////////////

  ///////////////////////////////////////////////
  //  Common
  // _getTimerCircleEl() {
  //   return this._parentEl.querySelector(".timerFinishPercent");
  // }

  _updateTimerCirclePercentageControllerEl(percent) {
    // const el = this._getTimerCircleEl();
    // console.log(el);
    this._percentageCircleControllerEl.setAttribute(
      "stroke-dasharray",
      `${percent},100`
    );
  }

  _calculateTimerCirclePercent() {
    return Math.floor((this._timePassed / this._duration) * 100);
  }

  _setTimerEndTime() {
    let endTime = this._duration * 1000 + Date.now();
    endTime = formatCurTime(endTime);
    this._timerEndTimeEl.textContent = endTime;
  }
  _updateTimerTimeValue() {
    let timeLeft = this._duration - this._timePassed;

    const timeLeftStr = formatTime(timeLeft);
    this._remainingTimeStr = timeLeftStr;
    this._timeValueEl.textContent = timeLeftStr;
  }

  _updateTimeAndPercentageCircle() {
    // 1Percentage.percent completed
    // 2.check if timer has finished

    // this._timePassed = this._getTimerTimePassed();

    this._percentageCircleSettimeoutID = setInterval(() => {
      this._timePassed = this._timePassed + 1;

      this._circleCompletedPercent = this._calculateTimerCirclePercent();

      this._updateTimerCirclePercentageControllerEl(
        this._circleCompletedPercent
      );
      this._updateTimerTimeValue();

      if (this._timePassed === this._duration) {
        return this.resetTimer(null, true);
      }
    }, 1000);
  }

  _stopUpdatingTimerPercentageCircle() {
    clearTimeout(this._percentageCircleSettimeoutID);
  }

  resetTimerPercentageCircle() {
    this._timePassed = 0;
    this._circleCompletedPercent = 0;
    this._stopUpdatingTimerPercentageCircle();
    this._updateTimerCirclePercentageControllerEl(0);
  }

  _resetTimeTimeValue() {
    this._timeValueEl.textContent = formatTime(0);
  }

  ///////////////////////////////////////////////////////

  // Handle 1 // show addTimer modal

  // handle 2
  _expandTimer(target, TimerView) {
    if (!target.closest('button[data-action="expand"]')) return;
    TimerView.showOverlay();
    this._parentEl.dataset.expand = true;
  }

  // handle 3
  _backToNormalTimer(target, TimerView) {
    if (!target.closest('button[data-action="normal"]')) return;
    TimerView.hideOverlay();
    this._parentEl.dataset.expand = false;
    this._parentEl.dataset.mini = false;
  }

  // Handle 4
  _minimizeTimer(target, TimerView) {
    if (!target.closest('button[data-action="mini"]')) return;
    TimerView.showOverlay();
    this._parentEl.dataset.expand = false;
    this._parentEl.dataset.mini = true;
  }
  // Handle 5
  _startTimer(target) {
    const btn = target.closest('button[data-action="start"]');
    if (!btn) return;

    this._parentEl.dataset.start = true;
    this._parentEl.dataset.pause = false;
    this.resetBtn.disabled = false;

    // these values are taken from clicked card
    const { duration, timePassed, remainingTimeStr, name } =
      this._parentEl.dataset;

    this._timerName = name;
    this._duration = Number(duration);
    this._timePassed = Number(timePassed);
    this._remainingTimeStr = remainingTimeStr;

    this._updateTimeAndPercentageCircle();
    this._setTimerEndTime();
  }

  // Handle 6
  _pauseTimer(target, handle) {
    const btn = target.closest('button[data-action="pause"]');
    if (!btn) return;

    this._parentEl.dataset.pause = true;
    this._parentEl.dataset.start = false;

    this._stopUpdatingTimerPercentageCircle();
    handle("pause-timer", this._timerName, {
      timePassed: this._timePassed,
      circlePercentCompleted: this._circleCompletedPercent,
      remainingTimeStr: this._remainingTimeStr,
    });
  }
  // Handle 7
  _resetTimer(target, reset = false, handle) {
    const btn = target?.closest('button[data-action="reset"]');
    if (!btn && !reset) return;

    this._parentEl.dataset.pause = false;
    this._parentEl.dataset.start = false;
    this.resetBtn.disabled = true;
    this._resetTimeTimeValue();
    this.resetTimerPercentageCircle();

    handle("reset-timer", this._timerName, {
      timePassed: 0,
      circlePercentCompleted: 0,
      remainingTimeStr: "00:00:00",
    });
  }

  // Handle 8
  _deleteTimer(target, handle) {
    const deleteBtn = target.closest("button[data-action='delete']");
    if (!deleteBtn) return;
    handle("delete-timer", this._parentEl.dataset.name);
  }

  // handle 8
  _editTimer(target, TimerModalView) {
    if (
      target.closest("button") ||
      document.querySelector(".card-list").getAttribute("data-enable-remove")
    )
      return;
    this.showEditModal(this._parentEl, TimerModalView);
  }

  // _addTimer(handle) {
  //   this.showAddModal("add", TimerModalView, handle, "Timer");
  // }

  // _handle 0
  _setDOMElForAccessibilityUse() {
    this._percentageCircleControllerEl = this._parentEl.querySelector(
      ".timerFinishPercent"
    );

    this._timePercentCircleEl = this._parentEl.querySelector(
      ".timerCard__time-percent"
    );

    this._timeValueEl = this._parentEl.querySelector(".timerCard__time-value");
    this.resetBtn = this._parentEl.querySelector('button[data-action="reset"]');
    this.startBtn = this._parentEl.querySelector('button[data-action="start"]');
    this._timerEndTimeEl = this._parentEl.querySelector(
      ".timerCard__timer-EndTime-value"
    );
  }

  _updateDOMEls() {}

  // handle 9

  handleCard(handle, TimerModalView, TimerView, e) {
    const target = e.target;
    this._parentEl = target.closest(".timerCard");

    if (!this._parentEl) return;

    // set dom el for use in the handleBtns case
    this._setDOMElForAccessibilityUse();

    this._updateDOMEls();

    // expandTimer timer
    this._expandTimer(target, TimerView);

    // cancel expand and take us to original timer
    this._backToNormalTimer(target, TimerView);

    // shrink timer
    this._minimizeTimer(target, TimerView);

    // play btn
    this._startTimer(target);

    // pause btn
    this._pauseTimer(target, handle);

    // reset Btn
    this._resetTimer(target, false, handle);

    // deleteCard is same as deleting timer
    this._deleteTimer(target, handle);

    // show edit Timer modal to edit timer
    this._editTimer(target, TimerModalView);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

export default new TimerCardView();
