class CrudView {
  _parentEl = document.querySelector(".crud-btns");
  _editBtn = this._parentEl.querySelector('button[data-action="edit"]');
  _doneBtn = this._parentEl.querySelector('button[data-action="done"]');
  _addBtn = this._parentEl.querySelector('button[data-action="add"]');

  // writing common function is quite resusable

  //   _removeTimerBtn =

  render(page_name) {
    this._parentEl.dataset.page = page_name;
  }

  // CSS *************************************

  // HANDLE ***********************************
  // handle 1
  _handleRemoveCard(action, CardListView) {
    if (action !== "edit") return;
    CardListView.allowToRemoveCardFromList();
    this._parentEl.dataset.edit = true;
  }

  // handle 2
  _handleDoneRemovingCard(action, CardListView) {
    if (action !== "done") return;
    CardListView.notAllowToRemoveCardFromList();
    this._parentEl.dataset.edit = false;
  }

  // handle 3
  _handleAddCard(action, ModalView, CardListView, cardType, handle) {
    if (action !== "add") return;
    ModalView.showAddModal(CardListView, cardType, handle);
  }

  handleBtns(handle, CardListView, ModalView, cardType) {
    this._parentEl.addEventListener("click", (e) => {
      const target = e.target.closest("button");
      if (!target) return;

      const { action } = target.dataset;
      this._handleRemoveCard(action, CardListView, handle);

      this._handleDoneRemovingCard(action, CardListView);

      this._handleAddCard(action, ModalView, CardListView, cardType, handle);
    });
  }
}

export default CrudView;
