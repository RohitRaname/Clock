import ModalView from "../../Common/ModalView.js";
import { replaceClass } from "../../../utils/_domFunction.js";

class TimerModalView extends ModalView {
  // _TimerCardListView = new TimerCardListView();

  _generateMarkUp(name, index, time, action) {
    const [hour, minute, second] = time.split(":");

    return `   
      <div
        class="modal-content"
        data-action=${action}
        data-index=${index}
        data-name=${name}
        data-type="timer"
        data-remaining-time-str=${time}
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
          } timer</h5>

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
            <i class="fas fa-ellipsis-v icon--dim icon--bg"></i>
            <div
              class="modal-box"
              data-active="false"
              data-time-unit="second"
            >
              <button
                class="modal-box__btn btn-icon--square"
                data-action="increase"
              >
                <i class="fas fa-angle-up"></i>
              </button>
              <p
                type="text"
                data-value="${second}"
                data-unit="second"
                class="modal-time__value"
              >
                ${second}
              </p>
              <button
                class="modal-box__btn btn-icon--square"
                data-action="decrease"
              >
                <i class="fas fa-angle-down"></i>
              </button>
            </div>
          </div>

          <div class="modal-name mg-bg" data-active="false">
            <i class="fas fa-edit icon--md"></i>
            <input type="text" class="modal-name__input" value="${name}" />
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

  show(name, index, remainingTime, duration, type, action) {
    this.render(name, index, remainingTime, duration, type, action);
    replaceClass(this._topParentEl, "hidden", "display");
  }

  showAddModal(CardListView, cardType) {
    let name, index, remainingTimeStr;
    index = CardListView.generateNewCardNumber();
    name = `${cardType} (${index})`;
    remainingTimeStr = "00:00:00";
    this.show(name, index, remainingTimeStr, "add");
  }

  // _updateExistingCard(name, time) {
  //   const curCard = document.querySelector(
  //     `.card[data-index="${this.cardIndex}"]`
  //     );
  //     console.log(curCard)
  //   curCard.querySelector(".card-name").textContent = name;
  //   curCard.querySelector(".card-time").textContent = time;

  //   console.log(name, time);
  // }

  saveCardUpdatedValues(action, index, handle) {
    const name = this.getUpdateCardName();
    const time = this.getUpdatedCardTime();
    const { duration, remainingTimeStr } = time;

    handle(action, index, {
      name,
      duration,
      remainingTimeStr,
    });

    this.hide();
  }

  addHandlerModal(handle) {
    // this.handleModal(handle, TimerCardListView);
    this.handleModal(handle); //
  }
}

export default TimerModalView;
