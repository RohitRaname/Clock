import { changeStrTimeInSeconds } from "../utils/_helper.js";

const timerState = {
  timers: [
    {
      index: 1,
      name: "Timer (1)",
      duration: 300,
      remainingTimeStr: "00:05:00",
      timePassed: 0,
      circlePercentCompleted: 0,
      type: "timer",
    },
    {
      index: 2,
      name: "Timer (2)",
      duration: 900,
      remainingTimeStr: "00:15:00",
      timePassed: 0,
      circlePercentCompleted: 0,
      type: "timer",
    },
    {
      index: 3,
      name: "Timer (3)",
      duration: 120,
      remainingTimeStr: "00:02:00",
      timePassed: 0,
      circlePercentCompleted: 0,
      type: "timer",
    },
    {
      index: 4,
      name: "Timer (4)",
      duration: 60,
      remainingTimeStr: "00:01:00",
      timePassed: 0,
      circlePercentCompleted: 0,
      type: "timer",
    },
  ],
};

// get one
// get all
// update one
// update all
// delete one
// delete all

export const modelGetAllTimers = () => timerState.timers;

export const modelGetTimer = (name) =>
  timerState.timers.filter((timer) => timer.name === name)[0];

export const modelGetTimerByIndex = (index) =>
  timerState.timers.filter((timer) => Number(timer.index) === Number(index))[0];

export const modelUpdateTimer = (name, updateProp) => {
  const timer = modelGetTimer(name);

  const updatePropArr = Object.entries(updateProp);
  updatePropArr.forEach((prop) => (timer[prop[0]] = prop[1]));
};

export const modelUpdateTimerByIndex = (index, updateProp) => {
  const timer = modelGetTimerByIndex(index);
  const updatePropArr = Object.entries(updateProp);
  updatePropArr.forEach((prop) => (timer[prop[0]] = prop[1]));
};

export const modelUpdateAllTimers = (updateProp) => {
  const allTimers = modelGetAllTimers();
  allTimers.forEach((timer) => modelUpdateTimer(timer.name, updateProp));
};

export const modelDeleteTimer = (name) => {
  let allTimers = modelGetAllTimers();
  timerState.timers = allTimers.filter((timer) => timer.name !== name);
};
export const modelDeleteTimerByIndex = (index) => {
  let allTimers = modelGetAllTimers();
  timerState.timers = allTimers.filter(
    (timer) => Number(timer.index) !== Number(index)
  );
};

export const modelDeleteAllTimer = (name) => {
  const allTimers = modelGetAllTimers();
  allTimers = [];
};

export const modelCreateTimer = (timerObj) => {
  const newTimerObj = {
    index: timerObj.index,
    name: timerObj.name,
    type: "timer",
    remainingTimeStr: timerObj.remainingTimeStr,
    // duration: changeStrTimeInSeconds(timerObj.remainingTimeStr),
    duration: timerObj.duration,
    timePassed: 0,
    circlePercentCompleted: 0,
  };

  timerState.timers.push(newTimerObj);
};


