import CardView from "../../Common/CardView.js";

class WorldClockCardView extends CardView {
  _parentEl;

  // variable defined
  _alarmIndex;

  _handleDeleteBtn(e, handle) {
    // i should not mess with basic data-attribute name
    // delete
    // edit
    const btn = e.target.closest('button[data-action="delete-card"]');
    if (!btn) return;
    handle("delete-clock", this._alarmIndex);
  }

  // MAIN --------------------------------------------
  handleCard(handle, e) {
    this._parentEl = e.target.closest(".card");

    if (!this._parentEl) return;
    this._alarmIndex = this._parentEl.dataset.index;

    // handle deltete Btn
    this._handleDeleteBtn(e, handle);
  }
}

export default WorldClockCardView;
