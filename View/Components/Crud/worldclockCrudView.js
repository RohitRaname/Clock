import CrudView from "../../Common/CrudView.js";

class WorldclockCrudView extends CrudView {
  constructor() {
    super();
    this.setAccoringToPage();
  }

  setAccoringToPage() {
    this.render("worldclock");
  }

  addHandlerBtns(handle, WorldclockListView, WorldclockModalView) {
    this.handleBtns(
      handle,
      WorldclockListView,
      WorldclockModalView,
      "worldclock"
    );
  }
}


export default WorldclockCrudView;
