import CrudView from "../../Common/CrudView.js";
import TimerCardListView from "../CardList/TimerCardListView.js";
import TimerCardView from "../Card/TimerCardView.js";
import TimerModalView from "../Modal/TimerModalView.js";

class TimerCrudView extends CrudView {
  constructor() {
    super();
    this.setAccoringToPage()
  }

  setAccoringToPage() {
    this.render("timer");
  }

  addHandlerBtns(handle,TimerCardListView,TimerModalView) {
    this.handleBtns(handle, TimerCardListView, TimerModalView,"timer");
  }
}

// index = TimerCardListView.generateNewCardNumber();
// name=`Timer(index)`
// time:"00:00:00"
// duration:0
// type:'timer'
export default TimerCrudView;
