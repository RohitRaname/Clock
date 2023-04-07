"use strict";

import WorldClockCardListView from "../../../View/Components/CardList/WorldClockCardListView.js";
import {
  getWorldClockCardView,
  controlWorldClockCard,
  controlUpdateClockTime,
} from "../Card/worldclockCardController.js";

import { modelGetClocks } from "../../../Model/worldclockModel.js";

const worldclockSectionEl = document.querySelector(".section-worldclock");

let View;
export const getWorldClockCardListView = () => View;

export const controlLoadAllClocks = () => {
  const clocks = modelGetClocks();
  View.render(clocks);
};

export const initialUpdateWorldClock = async () => {
  const promise = modelGetClocks().map((clock) =>
    controlUpdateClockTime(clock)
  );

  await Promise.all(promise);

  // when all update then load
  controlLoadAllClocks();
};

// update all set country time
export const updateWorldClocks = () => {
  setInterval(async () => {
    // update all clock at every min

    const promise = modelGetClocks().map((clock) =>
      controlUpdateClockTime(clock)
    );

    console.log(promise);

    await Promise.all(promise);

    // when all update then load
    controlLoadAllClocks();
  }, 1000 * 60);
};

if (worldclockSectionEl) {
  View = new WorldClockCardListView();
  initialUpdateWorldClock();

  updateWorldClocks();

  // handle all user interactions
  View.addHandlerCardList(controlWorldClockCard, getWorldClockCardView());
}
