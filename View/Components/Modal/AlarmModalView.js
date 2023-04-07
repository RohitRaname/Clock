import ModalView from "../../Common/ModalView.js";
import {
  advanceFormatTime,
  calculateRemainingTimeStr,
} from "../../../utils/_helper.js";

import { replaceClass } from "../../../utils/_domFunction.js";
class AlarmModalView extends ModalView {
  _generateMarkUp(action, datasetObj) {
    if (action === "edit")
      return this._generateEditModalMarkUp(action, datasetObj);

    return this._generateAddModalMarkUp(action, datasetObj);
  }

  _generateEditModalMarkUp(action, datasetObj) {
    const datasets = JSON.parse(JSON.stringify(datasetObj));
    // const days = JSON.parse()

    const days = JSON.parse(datasets.alarmDays);
    const tunes = ["cool", "io", "mdf", "mom", "pio", "risen", "roi"];

    let [hour, minute] = datasets.time.split(":");

    const repeat_alarm_period = [5, 10, 20, 30, 50, 60];

    return `<div
              class="modal-content"
              data-action=${action}
              data-index=${datasets.index}
              data-name="${datasets.name}"
              data-type="alarm"
              data-remaining-time-str="${datasets.remainingTime}"   
              data-alarm-tune="${datasetObj.alarmTune}"
              data-alarmRepeat-time-period=${datasetObj.alarmRepeatTimePeriod}
            >
              <button
                class="timerCard__header-btn card-header__btn btn-icon--square"
                data-action="delete"
              >
                <!-- <i class="icon fa fa-compress"></i> -->
                <i class="fas fa-trash-alt"></i>
              </button>
              <h5 class="h-5 mg-bg">${
                action.slice(0, 1).toUpperCase() + action.slice(1)
              } alarm</h5>

              <div class="modal-boxs mg-bg" data-disabled="false">
                <div class="modal-box" data-active="true" data-time-unit="hour">
                  <button
                    class="modal-box__btn btn-icon--square"
                    data-action="increase"
                  >
                    <i class="fas fa-angle-up"></i>
                  </button>
                  <p
                    type="text"
                    class="modal-time__value"
                    data-value="${hour}"
                    data-unit="hour"
                  >
                   ${hour}
                  </p>
                  <button
                    class="modal-box__btn btn-icon--square"
                    data-action="decrease"
                  >
                    <i class="fas fa-angle-down"></i>
                  </button>
                </div>
                <i class="fas fa-ellipsis-v icon--dim icon--bg"></i>
                <div
                  class="modal-box"
                  data-active="false"
                  data-time-unit="minute"
                >
                  <button
                    class="modal-box__btn btn-icon--square"
                    data-action="increase"
                  >
                    <i class="fas fa-angle-up"></i>
                  </button>
                  <p
                    type="text"
                    data-value="${minute}"
                    data-unit="minute"
                    class="modal-time__value"
                  >
                    ${minute}
                  </p>
                  <button
                    class="modal-box__btn btn-icon--square"
                    data-action="decrease"
                  >
                    <i class="fas fa-angle-down"></i>
                  </button>
                </div>
              </div>

              <div class="modal-input__box mg-sm" data-active="false">
                <i class="fas fa-edit icon--md"></i>
                <input type="text" name="name" class="modal-name__input" value="${
                  datasets.name
                }" />
              </div>

              <div class="modal-input__box mg-sm" >
              <button class="btn-checkbox" data-action="toggle-all-set-alarms" data-active=${
                datasetObj.ring_day_set ? true : false
              }>
                <i class="fa fa-check icon--md"></i>
              </button>
              <p class="paragraph">Repeat alarm</p>
            </div>

              <div class="alarm-days mg-sm">
              
                  ${days
                    .map(
                      (alarm_day) => `      
                      <button
                        class="alarm-dayBtn btn-icon--primary"
                        data-day=${alarm_day.day}
                        data-active="${alarm_day.active}"
                        data-completed="${alarm_day.completed}"
                      >
                        <span class="alarm-dayName">${alarm_day.day}</span>
                      </button>`
                    )
                    .join("")}
            </div>

              <div class="modal-input__box mg-sm" data-action="set-alarm-tune">
                <i class="fas fa-music icon--md"></i>
  
                <div class="modal-input__content dropdown-parent" data-active="false">

                  <input type="text" class="modal-input" data-action="set-alarm-tune" name="alarm_tune" value="${
                    datasetObj.alarmTune
                  }" />

                  <div class="dropdown dropdown-scale-middle">
                    <div class="list">
                        ${tunes
                          .map(
                            (value) =>
                              `<div class="list-item" data-value="${value}">
                                  <span class="list-text">${value} </span>
                                  <i class="fa fa-play"></i>
                              </div>`
                          )
                          .join("")}
                   
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="modal-input__box mg-md"
                data-active="false" 
                data-action="set-repeat-alarm-timer-period"
           
              >
                <i class="fas fa-bell icon--md"></i>

                <div class="modal-input__content dropdown-parent">
                  <input
                    type="text"
                    class="modal-input modal-input-repeat"
                    name="repeat_alarm_time_period"
                    data-action="set-repeat-alarm-timer-period"
                    value="${datasetObj.alarmRepeatTimePeriod} minutes"
                  />
                  <div class="dropdown dropdown-scale-middle">
                    <div class="list">
                        <div class="list-item" data-value="disabled">
                        <span class="list-text">Disabled</span>
                      </div>
                        ${repeat_alarm_period
                          .map(
                            (value) =>
                              `<div class="list-item" data-value="${value}">
                                  <span class="list-text">${value} minutes</span>
                              </div>`
                          )
                          .join("")}
                        </div>
                      </div>
                </div>
              </div>

              <div class="modal-crud__btns">
                <button class="modal-crud__btn btn--primary" data-action="save">
                  <i class="fas fa-save"></i>
                  <span>Save</span>
                </button>
                <button class="modal-crud__btn btn--outline" data-action="cancel">
                  <i class="fas fa-times"></i>
                  <span>Cancel</span>
                </button>
              </div>
            </div>`;
  }

  _generateAddModalMarkUp(action, datasetObj) {
    const { index, name, remainingTimeStr } = datasetObj;
    const [hour, minute] = remainingTimeStr.split(":");

    const days = [
      {
        day: "Mo",
        active: "false",
        completed: "false",
      },
      {
        day: "Tu",
        active: "false",
        completed: "false",
      },
      {
        day: "We",
        active: "false",
        completed: "false",
      },
      {
        day: "Th",
        active: "false",
        completed: "false",
      },
      {
        day: "Fr",
        active: "false",
        completed: "false",
      },
      {
        day: "Sa",
        active: "false",
        completed: "false",
      },
      {
        day: "Su",
        active: false,
        completed: "false",
      },
    ];

    const repeat_time_period = [5, 10, 20, 30, 50, 60];

    const tunes = ["cool", "io", "mdf", "mom", "pio", "risen", "roi"];

    return `<div
              class="modal-content"
              data-action=${action}
              data-index=${index}
              data-name="${name}"
              data-type="alarm"
              data-remaining-time-str="${remainingTimeStr}"   
              
            >
              <button
                class="timerCard__header-btn card-header__btn btn-icon--square"
                data-action="delete"
              >
                <!-- <i class="icon fa fa-compress"></i> -->
                <i class="fas fa-trash-alt"></i>
              </button>
              <h5 class="h-5 mg-bg">${
                action.slice(0, 1).toUpperCase() + action.slice(1)
              } alarm</h5>

              <div class="modal-boxs mg-bg" data-disabled="false">
                <div class="modal-box" data-active="true" data-time-unit="hour">
                  <button
                    class="modal-box__btn btn-icon--square"
                    data-action="increase"
                  >
                    <i class="fas fa-angle-up"></i>
                  </button>
                  <p
                    type="text"
                    class="modal-time__value"
                    data-value="${hour}"
                    data-unit="hour"
                  >
                   ${hour}
                  </p>
                  <button
                    class="modal-box__btn btn-icon--square"
                    data-action="decrease"
                  >
                    <i class="fas fa-angle-down"></i>
                  </button>
                </div>
                <i class="fas fa-ellipsis-v icon--dim icon--bg"></i>
                <div
                  class="modal-box"
                  data-active="false"
                  data-time-unit="minute"
                >
                  <button
                    class="modal-box__btn btn-icon--square"
                    data-action="increase"
                  >
                    <i class="fas fa-angle-up"></i>
                  </button>
                  <p
                    type="text"
                    data-value="${minute}"
                    data-unit="minute"
                    class="modal-time__value"
                  >
                    ${minute}
                  </p>
                  <button
                    class="modal-box__btn btn-icon--square"
                    data-action="decrease"
                  >
                    <i class="fas fa-angle-down"></i>
                  </button>
                </div>
              </div>

              <div class="modal-input__box mg-sm" data-active="false">
                <i class="fas fa-edit icon--md"></i>
                <input type="text" name="name" class="modal-name__input" value="${name}" />
              </div>

              <div class="modal-input__box mg-sm" >
              <button class="btn-checkbox" data-action="toggle-all-set-alarms" data-active="false">
                <i class="fa fa-check icon--md"></i>
              </button>
              <p class="paragraph">Repeat alarm</p>
            </div>

              <div class="alarm-days mg-sm">
              
                  ${days
                    .map(
                      (alarm_day) => `      
                      <button
                        class="alarm-dayBtn btn-icon--primary"
                        data-day=${alarm_day.day}
                        data-active="${alarm_day.active}"
                        data-completed="${alarm_day.completed}"
                      >
                        <span class="alarm-dayName">${alarm_day.day}</span>
                      </button>`
                    )
                    .join("")}
            </div>

              <div class="modal-input__box mg-sm" data-action="set-alarm-tune">
                <i class="fas fa-music icon--md"></i>
  
                <div class="modal-input__content dropdown-parent" data-active="false">

                  <input type="text" class="modal-input" data-action="set-alarm-tune" name="alarm_tune" value="${
                    tunes[0]
                  }" />

                  <div class="dropdown dropdown-scale-middle">
                    <div class="list">
                        ${tunes
                          .map(
                            (value) =>
                              `<div class="list-item" data-value="${value}">
                                  <span class="list-text">${value} </span>
                                  <i class="fa fa-play"></i>
                              </div>`
                          )
                          .join("")}
                   
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="modal-input__box mg-md"
                data-active="false" 
                data-action="set-repeat-alarm-timer-period"
           
              >
                <i class="fas fa-bell icon--md"></i>

                <div class="modal-input__content dropdown-parent">
                  <input
                    type="text"
                    class="modal-input modal-input-repeat"
                    name="repeat_alarm_time_period"
                    data-action="set-repeat-alarm-timer-period"
                    value="10 minutes"
                  />
                  <div class="dropdown dropdown-scale-middle">
                    <div class="list">
                        <div class="list-item" data-value="disabled">
                        <span class="list-text">Disabled</span>
                      </div>
                        ${repeat_time_period
                          .map(
                            (value) =>
                              `<div class="list-item" data-value="${value}">
                                  <span class="list-text">${value} minutes</span>
                              </div>`
                          )
                          .join("")}
                        </div>
                      </div>
                </div>
              </div>

              <div class="modal-crud__btns">
                <button class="modal-crud__btn btn--primary" data-action="save">
                  <i class="fas fa-save"></i>
                  <span>Save</span>
                </button>
                <button class="modal-crud__btn btn--outline" data-action="cancel">
                  <i class="fas fa-times"></i>
                  <span>Cancel</span>
                </button>
              </div>
            </div>`;
  }

  showAddModal(CardListView, cardType) {
    let name, index, remainingTimeStr;
    index = CardListView.generateNewCardNumber();
    name = `${cardType} (${index})`;
    remainingTimeStr = "00:00";

    const datasetObj = { name, index, remainingTimeStr };

    this.show("add", datasetObj);
  }

  show(action, datasetObj) {
    this.render(action, datasetObj);
    replaceClass(this._topParentEl, "hidden", "display");
  }

  _getInputRepeatEl() {
    return this._parentElContainerEl.querySelector(".modal-input-repeat");
  }

  // CSS ***********************************************
  // updateAdditionalCSS(target) {
  //   // toggle display of dropdown list
  //   const dropdownParentEl = target.closest(".dropdown-parent");
  //   if (!dropdownParentEl) return;
  //   let { active } = dropdownParentEl.dataset;

  //   active = active === "true" ? "false" : "true";
  //   dropdownParentEl.dataset.active = active;
  // }

  // COMMON

  _getAllDropdownParentEls() {
    return [...document.querySelectorAll(".dropdown-parent")];
  }

  _getAllAlarmsDayBtns() {
    return [...this._parentEl.querySelectorAll(".alarm-dayBtn")];
  }

  _showOnlyClickedDropdownList(curDropdownParent) {
    const allDropdownParentEls = this._getAllDropdownParentEls();
    allDropdownParentEls.forEach((parent) => {
      if (parent === curDropdownParent) {
        parent.dataset.active = "true";
        return;
      }
      parent.dataset.active = "false";
    });
  }

  _hideAllDropdownList() {
    const allDropdownParentEls = this._getAllDropdownParentEls();
    allDropdownParentEls.forEach((el) => (el.dataset.active = "false"));
  }

  _setClickDropdownItemValueInInput(target, inputUnitValue = "") {
    const el = target.closest(".dropdown-parent");
    if (!el) return;
    this._showOnlyClickedDropdownList(el);

    const curlistItemClickedEl = target.closest(".list-item");
    if (!curlistItemClickedEl) return;
    const curlistItemClickedElValue =
      target.closest(".list-item").dataset.value;
    const input = el.querySelector("input");

    input.value =
      curlistItemClickedElValue === "disabled"
        ? "disabled"
        : curlistItemClickedElValue + " " + inputUnitValue;

    return true;
  }

  // HANDLE *********************************************
  // handle 1
  _handleSetAlarmDay(target, handle) {
    const btn = target.closest(".alarm-dayBtn");
    if (!btn) return;

    let { day, active } = btn.dataset;

    active = active === "true" ? "false" : "true";

    btn.dataset.active = active;
    // handle("alarm-on-day-set", this.cardIndex, { day, active });
  }

  // handle 2
  _handleToggleAllAlarmsDay(target) {
    const btn = target.closest('button[data-action="toggle-all-set-alarms"]');
    if (!btn) return;

    let { active } = btn.dataset;
    active = active === "true" ? false : true;
    btn.dataset.active = active;

    const allAlarmDayBtns = this._getAllAlarmsDayBtns();
    allAlarmDayBtns.forEach((el) => (el.dataset.active = active));
  }

  // handle 3
  _handleSetAlarmTune(target) {
    if (!target.closest('.modal-input__box[data-action="set-alarm-tune"]'))
      return;

    // need to hide repeat input as it is creating problem
    this._getInputRepeatEl().classList.add("hidden");

    // play muisc if play btn clickded
    const audio = document.querySelector("audio");
    const playBtn = target.closest(".fa-play");
    if (playBtn) {
      const song = target.closest(".list-item").dataset.value;

      audio.src = `../../../music/${song}.mp3`;
      audio.play();
      return;
    }
    // alarm tune set
    const done = this._setClickDropdownItemValueInInput(target);

    if (done === true) {
      audio.pause();
      this._hideAllDropdownList();
      this._getInputRepeatEl().classList.remove("hidden");
      return;
    }
  }

  // handle 4
  _handleSetAlarmRepeatTimePeriod(target) {
    if (
      !target.closest(
        '.modal-input__box[data-action="set-repeat-alarm-timer-period"]'
      )
    )
      return;

    const done = this._setClickDropdownItemValueInInput(target, "minutes");
    if (done) this._hideAllDropdownList();
  }

  // handle 5
  _unSelectDisplayElsWhenLoseFocus(target) {
    if (!target.closest(".dropdown-parent")) {
      this._getInputRepeatEl().classList.remove("hidden");
      this._hideAllDropdownList();
      document.querySelector("audio").pause();
    }
  }

  saveCardUpdatedValues(action, index, handle) {
    let active;
    const dayArr = [];
    let ring_day_set = false;

    const name = this.getUpdateCardName();
    const timeValues = this.getUpdatedCardTime();

    const allInputs = [...this._parentEl.querySelectorAll("input")];
    const dataObj = allInputs.reduce((obj, input) => {
      obj[input.name] = input.value;
      return obj;
    }, {});

    dataObj["repeat_alarm_time_period"] =
      dataObj["repeat_alarm_time_period"].split(" ")[0];

    const allDaysBtns = this._getAllAlarmsDayBtns();
    allDaysBtns.forEach((btn) => {
      const dayProp = {};
      dayProp.day = btn.dataset.day;
      dayProp.active = btn.dataset.active;
      dayProp.completed = btn.dataset.completed;

      if (btn.dataset.active === "true") ring_day_set = true;

      dayArr.push(dayProp);
    });

    dataObj.alarm_days = dayArr;

    let { duration: timeInSeconds, remainingTimeStr: time } = timeValues;
    time = time.split(":").slice(0, 2).join(":");
    const remainingTimeStr = calculateRemainingTimeStr(time);

    active = ring_day_set ? true : false;

    handle(action, index, {
      name,
      time,
      ring_day_set,
      active,
      ...dataObj,
    });

    this.hide();

  }

  handleAdditionBtns(target, handle) {
    // handle set or unset alarm on days
    this._handleSetAlarmDay(target, handle);

    // handle toggle all alarm on days by clicking checbox
    this._handleToggleAllAlarmsDay(target);

    // show dropdown list of tunes
    this._handleSetAlarmTune(target);

    // show dropdown list of alarm repeat time period
    this._handleSetAlarmRepeatTimePeriod(target);

    // hide when component lose focus and remove some other things
    // like pause song and show repeat input
    this._unSelectDisplayElsWhenLoseFocus(target);
  }

  addHandlerModal(handle) {
    this.handleModal(handle); //
  }
}

export default AlarmModalView;
