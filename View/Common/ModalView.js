import { replaceClass } from "../../utils/_domFunction.js";
import { changeStrTimeInSeconds } from "../../utils/_helper.js";
import ParentView from "../ParentView.js";

class ModalView extends ParentView {
  _topParentEl = document.querySelector(".modal");
  _parentElContainerEl = document.querySelector(".modal-container");
  _parentEl;

  // import variables
  handle;
  // CardListView;
  cardType;
  cardIndex;
  cardAction;

  render(name, index, remainingTime, duration, type, action) {
    this._clear(this._parentElContainerEl);

    const html = this._generateMarkUp(
      name,
      index,
      remainingTime,
      duration,
      type,
      action
    );
    this._parentElContainerEl.insertAdjacentHTML("afterbegin", html);
  }

  // common ***************************************
  show() {
    // defined in own modal component
  }

  hide() {
    replaceClass(this._topParentEl, "display", "hidden");
  }

  _getAllTimeUnitValueEl() {
    return [...this._parentEl.querySelectorAll(".modal-time__value")];
  }

  _getInputNameEl() {
    return this._parentEl.querySelector(".modal-name__input");
  }

  _getCardName() {
    return this._parentEl.querySelector(".modal-name__input").value;

    // send new name in handler
    // this.handle(nameInput.value)
  }

  _getCardIndex() {
    return this._parentEl.dataset.index;
  }

  // showAddModal(CardListView, cardType) {
  //   let name, index, remainingTimeStr;
  //   index = CardListView.generateNewCardNumber();
  //   name = `${cardType} (${index})`;
  //   remainingTimeStr = "00:00:00";
  //   this.show(name, index, remainingTimeStr, "add");
  // }

  // handler not a render function
  _hideModal(target) {
    if (target.classList.contains("overlay-transparent")) {
      this.hide();
    }
  }

  // handler 1
  _handleDeleteBtn(target, handle) {
    if (!target.closest('button[data-action="delete"]')) return;

    handle("delete", this.cardIndex);
    // this.CardListView.deleteCard(this.index);
    this.hide();
    // this.handle(this.cardType,  this.cardIndex);
  }

  // handler 2 *************************************
  _setTime(action, timeEl, max_time_value) {
    let time = Number(timeEl.dataset.value);

    time = action === "decrease" ? time - 1 : time + 1;

    time = time > max_time_value ? "0" : time;
    time = time < 0 ? max_time_value : time;

    time = time < 10 ? `0${time}` : time;

    timeEl.dataset.value = time;
    timeEl.textContent = time;
  }

  _updateHour(action, timeEl) {
    this._setTime(action, timeEl, 24);
  }
  _updateMinute(action, timeEl) {
    this._setTime(action, timeEl, 60);
  }
  _updateSecond(action, timeEl) {
    this._setTime(action, timeEl, 60);
  }

  _updateCardTimeCommonCSS(target) {
    const modalTimeContainer = target.closest(".modal-box");
    if (!modalTimeContainer) return;
    const timeUpdateBtn = target.closest(".modal-box__btn");
    const timeValueEl = modalTimeContainer.querySelector(".modal-time__value");

    if (!timeUpdateBtn) return;
    const { timeUnit } = modalTimeContainer.dataset;
    const { action } = timeUpdateBtn.dataset;

    if (timeUnit === "hour") this._updateHour(action, timeValueEl);
    if (timeUnit === "minute") this._updateMinute(action, timeValueEl);
    if (timeUnit === "second") this._updateSecond(action, timeValueEl);
  }

  // ***********************************************
  // handler 3

  getUpdatedCardTime() {
    const timeEls = this._getAllTimeUnitValueEl();

    let time = timeEls.map((mov) => [mov.dataset.unit, mov.dataset.value]);

    time = Object.fromEntries(time);

    const { hour, minute, second } = time;
    const remainingTimeStr = `${hour}:${minute}:${second || "00"}`;
    const duration = changeStrTimeInSeconds(remainingTimeStr);

    return {
      remainingTimeStr,
      duration,
    };
  }

  getUpdateCardName() {
    const newName = this._getCardName();
    return newName;
  }

  saveCardUpdatedValues() {
    // modified in ModalView component
  }

  _handleSaveBtn(target, handle) {
    const btn = target.closest('button[data-action="save"]');
    if (!btn) return;

    const updatedName = this.getUpdateCardName().trim();
    if (updatedName === "") return;

    this.saveCardUpdatedValues(this.cardAction, this.cardIndex, handle);

    //  handle({name,time})
    //
    //
  }

  // ***********************************************
  // handler 4
  _handleCancelBtn(target) {
    const btn = target.closest('button[data-action="cancel"]');
    if (!btn) return;

    this.hide();
  }
  // ***********************************************

  //handle 5 => done in own Modal Component
  handleAdditionBtns() {}

  // handle 6 in own COMPONET MODAL
  updateAdditionalCSS() {}

  // whenever addEventListener is not working it just mean the element which you add Event listener is removed from dom

  // handleModal(handle, CardListView) {
  handleModal(handle) {
    this._topParentEl.addEventListener("click", (e) => {
      this._parentEl = this._topParentEl.querySelector(".modal-content");
      const target = e.target;

      this.handle = handle;
      // // this.CardListView = CardListView;
      this.cardType = this._parentEl.dataset.type;
      this.cardIndex = this._parentEl.dataset.index;
      this.cardAction = this._parentEl.dataset.action;

      // CSS ******************************************
      // auto adjust time by clicking up and down arrow
      // increase arrow
      // decrease arrow
      this._updateCardTimeCommonCSS(target);

      this._hideModal(target);

      // update css in own defined modal component
      this.updateAdditionalCSS(target);

      // JS ******************************************
      // delete alarm or timer
      this._handleDeleteBtn(target, handle);

      // save btn
      this._handleSaveBtn(target, handle);

      // cancel btn
      this._handleCancelBtn(target, handle);

      // done in own Modal Component
      this.handleAdditionBtns(target, handle);
    });
  }
}

export default ModalView;
