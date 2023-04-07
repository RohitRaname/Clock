import ParentView from "../../ParentView.js";
import { closest, contains } from "../../../utils/_domFunction.js";

class AlarmCompletedPopupView extends ParentView {
  _topParentEl = document.querySelector(".popup");
  _parentEl = document.querySelector(".popup-container");
  audio = document.querySelector("audio");

  _subParentEl;

  _snoozeTimeInputEl;
  _snoozeTextEl;
  _snoozeTimeDropdownEl;
  _snoozeTimeDropdownItemsElArr;

  _alarm_index;
  _alarm_day;

  _generateMarkUpList(alarm) {
    // alaways set data attribute inside the semi-container if it is a overlay component
    const { index, day } = alarm;
    return `       
            <div class="popup-content data-action="alarm-completed" data-alarm-index=${index} data-alarm-day=${day}>
            <header class="popup-header f-s mg-lw">
            <div class="f-sm">
                <i class="fa fa-clock"></i>
                <p class="paragraph--md">Clock</p>
            </div>
            <div class="f-sm">
                <button
                class="btn-icon btn--sm"
                data-action="dismiss-alarm-by-close-btn"
                >
                <i class="fa fa-times"></i>
                </button>
            </div>
            </header>

            <div class="popup-content mg-lw">
            <p class="paragraph--md">Alarm</p>
            <p class="paragraph--md">Alarm (${index})</p>
            <p class="paragraph--md mg-lw">00:00</p>

            <button
                class="btn--black btn--100 btn--change-time dropdown-parent f-s"
                data-active="false"
                data-action="snooze-alarm-time-period"
                data-dpos="top"
            >
                <input type="text" class="hidden" value="10" name="snooze" />
                <p class="paragraph--md popup-snooze-text">10 minutes</p>

                <i class="fas fa-angle-down"></i>

                <div class="dropdown dropdown--auto" data-type="snooze-alarm">
                <div class="list">
                    <div class="list-item" data-active="true" data-value="10">10 minutes</div>
                    <div class="list-item" data-value="20">20 minutes</div>
                    <div class="list-item" data-value="30">30 minutes</div>
                    <div class="list-item" data-value="50">50 minutes</div>
                    <div class="list-item" data-value="60">1 hour</div>
                </div>
                </div>
            </button>
            </div>

            <footer class="popup-footer f-b">
            <button class="btn--black" data-action="save-snooze-time">
                Snooze
            </button>
            <button
                class="btn--black"
                data-action="dismiss-alarm-by-main-btn"
            >
                Dismiss
            </button>
            </footer>
        </div>
  `;
  }

  // setSomeCSSChangesAfterRenderCompleted() {
  //   this._show();

  // }

  // HANDLE ************************************

  // handle HELPER *********************
  _show(alarm_tune) {
    this.audio.src = `../../../music/${alarm_tune}.mp3`;
    this.audio.play();
    this._topParentEl.classList.remove("hidden");
  }

  _hide() {
    this._topParentEl.classList.add("hidden");
    this.audio.pause();
  }

  _setDOMElsForUse() {
    this._subParentEl = this._parentEl.querySelector(".popup-content");

    this._snoozeTimeInputEl = this._parentEl.querySelector(
      'input[name="snooze"]'
    );
    this._snoozeTextEl = this._parentEl.querySelector(".popup-snooze-text");
    this._snoozeTimeDropdownEl = this._parentEl.querySelector(
      '.dropdown[data-type="snooze-alarm"]'
    );
    this._snoozeTimeDropdownItemsElArr = [
      ...this._snoozeTimeDropdownEl.querySelectorAll(".list-item"),
    ];
  }

  _dismissAlarm(handle) {
    handle("dismiss-alarm", { index: this._alarm_index, day: this._alarm_day });
  }

  //////////////////////////////////////
  // - handle 1
  _handleDismissAlarmByCloseBtn(target, handle) {
    if (!target.closest('button[data-action="dismiss-alarm-by-close-btn"]'))
      return;

    this._dismissAlarm(handle);
    this._hide();
  }

  // - handle 2
  _handleSetSnoozeTimePeriod(target) {
    const btn = target.closest(
      'button[ data-action="snooze-alarm-time-period"]'
    );
    if (!btn) return;

    const { active } = btn.dataset;

    // if open and  click on item
    const listItem = closest(target, "list-item");

    if (listItem) {
      const { value } = listItem.dataset;
      this._snoozeTimeInputEl.value = value;

      this._snoozeTextEl.textContent = `${value} minutes`;

      btn.dataset.active = "false";
      return;
    }

    // if not open || active === false

    const curValue = this._snoozeTimeInputEl.value;
    this._snoozeTimeDropdownItemsElArr.forEach((el) => {
      if (el.dataset.value === curValue) return (el.dataset.active = true);
      el.dataset.active = false;
    });
    btn.dataset.active = "true";
  }

  // - handle 3
  _handleSnoozeBtn(target, handle) {
    if (!target.closest("button[data-action='save-snooze-time']")) return;

    const snoozeTime = this._snoozeTimeInputEl.value;
    handle("snooze-alarm-time", {
      index: this._alarm_index,
      day: this._alarm_day,
      snoozeTimePeriod: snoozeTime,
    });

    this._hide();
  }

  // handle 4
  _handleDismissAlarmByMainBtn(target, handle) {
    if (!target.closest('button[data-action="dismiss-alarm-by-main-btn"]'))
      return;

    this._dismissAlarm(handle);
    this._hide();
  }

  // handle 5
  _handleHidePosAbsElsWhenLoseFocus(target) {
    // Clicked on overlay
    if (target.closest(".overlay")) this._hide();

    // hide dropdown
    if (!target.closest(".dropdown-parent"))
      this._snoozeTimeDropdownEl.closest(
        ".dropdown-parent"
      ).dataset.active = false;
  }

  // handle 6
  _handleDismissAlarmByClickingOnOverlay(target, handle) {
    if (target.closest(".overlay")) this._dismissAlarm(handle);
  }

  addHandlerPopup(handle) {
    this._topParentEl.addEventListener("click", (e) => {
      this._setDOMElsForUse();

      const target = e.target;

      // storing important imformation
      const { alarmIndex, alarmDay } = this._subParentEl.dataset;

      this._alarm_index = alarmIndex;
      this._alarm_day = alarmDay;

      // dismiss alarm by icon
      this._handleDismissAlarmByCloseBtn(target, handle);

      // select snooze alarm time period
      this._handleSetSnoozeTimePeriod(target);

      // snooze alarm for selected time period
      this._handleSnoozeBtn(target, handle);

      // dismiss alarm by button
      this._handleDismissAlarmByMainBtn(target, handle);

      // dismiss alarm by clicking on overlay
      this._handleDismissAlarmByClickingOnOverlay(target, handle);

      this._handleHidePosAbsElsWhenLoseFocus(target);
    });
  }
}

export default AlarmCompletedPopupView;
