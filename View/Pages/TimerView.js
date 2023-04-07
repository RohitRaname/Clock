"use strict";

// what i can do is all all srcipt its papge 
// time_page
// alarm_page
// world_clock_page

import { addClass, findEl, removeClass } from "../../utils/_domFunction.js";
import ParentView from "../ParentView.js";


class TimerView extends ParentView {
  _sectionEl = findEl("section-timer");
  _sectionOverlayEl = this._sectionEl.querySelector(".overlay");
  _timerContainerParentEl = this._sectionEl.querySelector(".timer");
  _timerContainerEl = findEl("timer__container");

  _parentEl = findEl("timer__list");



  //////////////////////////////////////////////////////////

  showOverlay() {
    removeClass(this._sectionOverlayEl, "hidden");
  }
  hideOverlay() {
    addClass(this._sectionOverlayEl, "hidden");
  }

  ///////////////////////////////////////////////
}

export default TimerView;
