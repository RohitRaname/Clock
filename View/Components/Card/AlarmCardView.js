import CardView from "../../Common/CardView.js";

class AlarmCardView extends CardView {
  _parentEl;

  // variable defined
  _alarmIndex;

  // handle 1
  _showEditModal(e, AlarmModalView) {
    // i should have send the handle here and pass the index to it so the control can render the EditModal with all the imformation it needed
    // in attriute i just need to save just identity values like most important once like
    // index
    // or if want one more then name
    // index is self explanatory on its own
    if (
      e.target.closest("button") ||
      document
        .querySelector(".card-list")
        .getAttribute("data-enable-remove") === "true"
    )
      return;

    AlarmModalView.show("edit", this._parentEl.dataset);
  }

  // handle 2
  _startOrPauseAlarm(e, handle) {
    const btn = e.target.closest('button[data-action="start&pause"]');

    if (!btn) return;
    let { active } = btn.dataset;
    active = active === "false" ? "true" : "false";
    btn.dataset.active = active;
    this._parentEl.dataset.active = active;

    active === "true"
      ? handle("start-alarm", this._alarmIndex)
      : handle("pause-alarm", this._alarmIndex);
  }

  _handleDeleteBtn(e, handle) {
    const btn = e.target.closest('button[data-action="delete"]');
    if (!btn) return;
    handle("delete-alarm", this._alarmIndex);
  }

  // MAIN --------------------------------------------
  handleCard(handle, AlarmModalView, e) {
    this._parentEl = e.target.closest(".card");

    if (!this._parentEl) return;
    this._alarmIndex = this._parentEl.dataset.index;

    // show edit modal
    this._showEditModal(e, AlarmModalView);

    // start and pause alarm
    this._startOrPauseAlarm(e, handle);

    // handle deltete Btn
    this._handleDeleteBtn(e, handle);
  }
}

export default AlarmCardView;
