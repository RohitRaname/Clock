import ParentView from "../ParentView.js";

class CardListView extends ParentView {
  addNewCard(card) {
    const html = this.render([card], false, false);
    this._parentEl.insertAdjacentHTML("beforeend", html);
  }

  allowToRemoveCardFromList() {
    this._parentEl.dataset.enableRemove = "true";
  }

  notAllowToRemoveCardFromList() {
    this._parentEl.dataset.enableRemove = "false";
  }

  getAllCardsIndex() {
    return [...document.querySelectorAll(".card")].map(
      (card) => card.dataset.index
    );
  }

  // generate new index for new card willl be done by cardlist weare going to loop throug all cards
  generateNewCardNumber() {
    let num;
    const allCardsEl = this.getAllCardsIndex();
    for (let i = 1; i < 100; i++) {
      if (!allCardsEl.includes(`${i}`)) {
        num = i;
        break;
      }
    }
    return num;
  }

  deleteCard(card_index) {
    this.getAllCards().forEach((card) => {
      if (Number(card.dataset.index) === Number(card_index)) card.remove();
    });
  }
}

export default CardListView;
