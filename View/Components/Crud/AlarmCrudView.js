import CrudView from "../../Common/CrudView.js";


class AlarmCrudView extends CrudView {
  constructor() {
    super();
    this.setAccoringToPage();
  }

  setAccoringToPage() {
    this.render("alarm");
  }

  addHandlerBtns(handle, AlarmCardListView, AlarmModalView) {
    this.handleBtns(handle, AlarmCardListView, AlarmModalView, "alarm");
  }
}

// index = AlarmCardListView.generateNewCardNumber();
// name=`Alarm(index)`
// time:"00:00:00"
// duration:0
// type:'Alarm'
export default AlarmCrudView;
