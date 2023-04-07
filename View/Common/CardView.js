class CardView {
  showEditModal(card, ModalView) {
    const { name, index, remainingTimeStr } = card.dataset;
    ModalView.show(name, index, remainingTimeStr, "edit");
  }

  showAddModal(ModalView, cardType) {
    let name, index, remainingTimeStr;
    index = this.generateNewCardNumber();
    name = `${cardType} (${index})`;
    remainingTimeStr = "00:00:00";
    ModalView.show(name, index, remainingTimeStr, "add");
  }
}

export default CardView;
