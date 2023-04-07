"use strict";

import WorldClockCardView from "../../../View/Components/Card/WorldClockView.js";
import { controlLoadAllClocks } from "../CardList/worldclockCardListController.js";

import {
  modelDeleteClock,
  modelGetClocks,
  modelUpdateClock,
} from "../../../Model/worldclockModel.js";

const worldclockSectionEL = document.querySelector(".section-worldclock");

let View;

const convertUTCDateToLocalDate = (timeInSeconds) => {
  timeInSeconds = `${timeInSeconds}`;

  // signpresent - or not sign mean plus
  const signPresent = timeInSeconds.slice(0, 1) === "-" ? true : false;

  const seconds = signPresent
    ? Number(timeInSeconds.slice(1)) * 1000
    : Number(timeInSeconds) * 1000;

  let date;

  date = signPresent
    ? new Date(+new Date() + seconds)
    : new Date(+new Date() - seconds);

  console.log(date);
  // newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
};

export const controlUpdateClockTime = async (clock) => {
  let res;
  try {
    res = await fetch(`http://worldtimeapi.org/api/timezone/${clock.location}`);

    res = await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }

  let date, date_convert, date_local_str, time;

  let { raw_offset } = res;

  let day_state, time_comparision_str;
  date_convert = convertUTCDateToLocalDate(raw_offset);
  date_local_str = date_convert.toLocaleString().split(",");
  date = date_local_str[0];
  day_state = date_convert.getHours() < 18 ? "night" : "day";

  time_comparision_str = `${Math.floor(
    (new Date() - date_convert) / (3600 * 1000)
  )}hrs ${Math.floor((new Date() - date_convert) % (3600 * 1000))}mins`;

  time_comparision_str =
    new Date() > date_convert
      ? `+${time_comparision_str}`
      : time_comparision_str;

  time = date_local_str[1];
  time = time.trim().split(":");
  time = time[0] + ":" + time[1];

  modelUpdateClock(clock.index, {
    date,
    time,
    day_state,
    time_comparision_str,
  });
};

export const controlWorldClockCard = (action, index) => {
  console.log(index);
  if (action === "delete-clock") modelDeleteClock(index);

  controlLoadAllClocks();
};

export const getWorldClockCardView = () => View;

if (worldclockSectionEL) {
  View = new WorldClockCardView();
}
