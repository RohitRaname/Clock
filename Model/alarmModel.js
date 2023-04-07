import { getCurDay } from "../utils/_helper.js";
// pay attention to model very properly and rightly
// write correct property names which are self explanable
// use dummy as real

let alarmState = {
  // to reset alarm completed as false every week

  alarms: [
    {
      index: 1,
      name: "Alarm (1)",
      time: "13:50",

      // i just only need remainingTime though it can calculate alll other time related prop easily
      remainingTimeStr: "",
      remainingTimeInSec: 0,
      type: "alarm",
      active: true,

      ring_once: false,
      ring_day_set: true,

      alarm_repeat_time_period: 10,
      alarm_tune: "cool",

      alarm_days: [
        {
          day: "Mo",
          active: "false",
          timing: "",
          completed: "false",
        },
        {
          day: "Tu",
          active: "true",
          completed: "false",
          timing: "",
        },
        {
          day: "We",
          active: "false",
          completed: "false",
          timing: "",
        },
        {
          day: "Th",
          active: "false",
          completed: "false",
          timing: "",
        },
        {
          day: "Fr",
          active: "false",
          completed: "false",
          timing: "",
        },
        {
          day: "Sa",
          active: "false",
          completed: "false",
          timing: "",
        },
        {
          day: "Su",
          active: "false",
          completed: "false",
        },
      ],
      alarm_tunes: ["cool", "io", "mdf", "mom", "pio", "risen", "roi"],
    },
    // {
    //   index: 2,
    //   name: "Alarm (2)",
    //   remainingTimeStr: "",
    //   remainingTimeInSec: 0,
    //   remainingTimeInSec: 0,
    //   time: "2:50",

    //   // i just only need remainingTime though it can calculate alll other time related prop easily

    //   type: "alarm",
    //   active: true,

    //   ring_once: true,
    //   ring_day_set: false,

    //   alarm_repeat_time_period: 10,
    //   alarm_tune: "cool",

    //   alarm_days: [
    //     {
    //       day: "M",
    //       active: "false",
    //       completed: "false",
    //       timing: "",
    //     },
    //     {
    //       day: "Tu",
    //       active: "false",
    //       completed: "false",
    //       timing: "",
    //     },
    //     {
    //       day: "We",
    //       active: "false",
    //       completed: "false",
    //       timing: "",
    //     },
    //     {
    //       day: "Th",
    //       active: "false",
    //       completed: "false",
    //       timing: "",
    //     },
    //     {
    //       day: "Fri",
    //       active: "false",
    //       completed: "false",
    //       timing: "",
    //     },
    //     {
    //       day: "Sa",
    //       active: "false",
    //       completed: "false",
    //       timing: "",
    //     },
    //     {
    //       day: "Su",
    //       active: "false",
    //       completed: "false",
    //       timing: "",
    //     },
    //   ],
    //   alarm_tunes: ["cool", "io", "mdf", "mom", "pio", "risen", "roi"],
    // },
  ],
};

export const newObj = (obj) => immer.produce(obj, (draft) => draft);

export const modelGetAllAlarms = () =>
  immer.produce(alarmState, (draft) => {
    return draft.alarms;
  });

export const modelGetAlarm = (index) =>
  immer.produce(alarmState, (draft) => {
    const alarm = draft.alarms.filter(
      (alarm) => Number(alarm.index) === Number(index)
    )[0];
    return alarm;
  });

export const modelUpdateAlarm = (index, updateProp) => {
  const rIndex = Number(index);

  // obj new Create but reference obj inside are same
  const alarm = modelGetAlarm(rIndex);

  const updateAlarm = immer.produce(alarm, (draft) => {
    // expensive thing to copy a obj

    const updatePropArr = Object.entries(updateProp);
    updatePropArr.map((prop) => {
      if (prop[1] === undefined) return;
      draft[prop[0]] = prop[1];

      return draft;
    });
    return draft;
  });

  alarmState = immer.produce(alarmState, (draft) => {
    draft.alarms.splice(rIndex - 1, 1, updateAlarm);
    return draft;
  });

  return updateAlarm;
};

// export const modelUpdateAlarmAndReturnAlarmArr = (index, updateProp) => {
//   modelUpdateAlarm(index, updateProp);
//   return modelGetAllAlarms();
// };

export const modelUpdateAllAlarms = (updateProp) => {
  const alarms = modelGetAllAlarms();

  const updatedAlarms = alarms.map((alarm) =>
    modelUpdateAlarm(alarm.index, updateProp)
  );

  return updatedAlarms;
};

export const modelDeleteAlarm = (index) => {
  const rIndex = Number(index);
  alarmState = immer.produce(alarmState, (draft) => {
    draft.alarms.splice(rIndex - 1, 1);
  });
};

export const modelDeleteAllAlarm = () => {
  alarmState = immer.produce(alarmState, (draft) => {
    draft.timers = [];
    return draft;
  });

  return alarmState.alarms;
};

export const modelCreateAlarm = (alarmObj) => {
  const newAlarmObj = alarmObj;
  alarmState = immer.produce(alarmState, (draft) => {
    draft.alarms.push(newAlarmObj);
  });

  console.log(alarmState);
};

export const modelReplaceAlarm = (alarmIndex, updateAlarmObj) => {
  alarmState = immer.produce(alarmState, (draft) => {
    draft.alarms.splice(alarmIndex, 1, updateAlarmObj);
  });
};

// anything related to alarm model should be taken care here whether is remainingTimeStr or whatever

///////////////////////////////////////////////////////////////////
// - Query model for properies or to get dynamic values
///////////////////////////////////////////////////////////////////

export const modelGetAlarmDays = (index) => {
  const alarm = modelGetAlarm(index);
  return immer.produce(alarm.alarm_days, (draft) => draft);
};

export const modelCalulateRemainingTimeProps = (alarm_ring_time) => {
  const timing = alarm_ring_time;
  const remainingSec = Number(timing) - Number(new Date());
  const sec_in_day = 86400 * 1000;
  const sec_in_hour = 3600 * 1000;
  const sec_in_min = 60 * 1000;

  let day = Math.floor(remainingSec / sec_in_day);
  if (!day) day = 0;

  let hour = Math.floor((remainingSec % sec_in_day) / sec_in_hour);

  let min = Math.floor(
    ((remainingSec % sec_in_day) % sec_in_hour) / sec_in_min
  );
  let dayStr, hourStr, minStr;

  if (day) {
    dayStr = day === 0 ? "" : day;
    dayStr = day === 1 && day !== 0 ? `${day} day, ` : `${day} days, `;
  }
  if (hour) {
    hourStr = hour === 0 ? "" : hour;
    hourStr = hour === 1 && hour !== 0 ? `${hour} hour, ` : `${hour} hours, `;
  }
  if (min) {
    minStr = min === 0 ? "" : min;
    minStr = min === 1 && min !== 0 ? `${min} minute` : `${min} minutes`;
  }

  if (day <= 0) dayStr = "";
  if (hour <= 0) hourStr = "";
  if (min <= 0) minStr = "0 minute";

  return {
    remainingTimeStr: `${dayStr}${hourStr}${minStr}`,
    remainingTimeInSec: remainingSec,
  };
};

export const modelGetAlarmRemainingTime = (index, optional_alarm_obj) => {
  const alarm = index ? modelGetAlarm(index) : optional_alarm_obj;

  // if for set alarm on days
  let orderAlarmDays = immer.produce(alarm.alarm_days, (draft) => {
    return draft.sort((a, b) => Number(a.timing) - Number(b.timing));
  });

  let nearest_alarm = orderAlarmDays.find(
    (el) => el.active === "true" && el.completed === "false"
  );

  console.log(nearest_alarm);
  // alarm set for only once

  if (!nearest_alarm) {
    nearest_alarm = orderAlarmDays.find(
      (el) => new Date(el.timing) > new Date()
    );
  }

  const { timing } = nearest_alarm;
  return modelCalulateRemainingTimeProps(timing);
};

// this function set particular alarm all 7 day alarm timing when they will ring not remaining time , remaining time will be done by another function
// need to call in starting to set alarm timing
// like
// {sun:7, mon:7,tue:7,wed:7}
export const modelSetAlarmAllDaysTiming = (
  index,
  time,
  updateState = false,
  optional_alarm_obj = false
) => {
  const alarm = index ? modelGetAlarm(index) : optional_alarm_obj;

  let cur_date = new Date().toLocaleString().split(",")[0].split("/");
  cur_date =
    cur_date.slice(1, 2) + "/" + cur_date.slice(0, 1) + "/" + cur_date.slice(2);

  const default_alarm_date = +new Date(`${cur_date} ${time}`);
  console.log(new Date(default_alarm_date));
  // checking is current set time is less if less we start from next day
  // if we start with today and time is less the alarm will not work proper so we do it from tommorrow

  // if set on friday 00:00 and its friday 6:30 then we need to set the friday as next week by changing the day order
  const cur_time_is_less = default_alarm_date < +new Date();
  console.log(cur_time_is_less);
  const properWeekDayOrder = cur_time_is_less
    ? modelGetProperDayOrderAccToCurDay(true)
    : modelGetProperDayOrderAccToCurDay();

  console.log(properWeekDayOrder);
  const updateAlarm = immer.produce(alarm, (draft) => {
    properWeekDayOrder.map((el, i) => {
      const current_alarm = draft.alarm_days.find((mov) => mov.day === el);

      current_alarm.timing = new Date(
        default_alarm_date + 86400 * (cur_time_is_less ? i + 1 : i) * 1000
      );

      return current_alarm;
    });
  });

  if (index && updateState) modelReplaceAlarm(Number(index) - 1, updateAlarm);

  return updateAlarm;
};

export const modelSetAlarmTimingForGivenDayAlarms = (alarms, time) => {
  const cur_date = new Date().toLocaleString().split(",")[0];
  const default_alarm_date = +new Date(`${cur_date} ${time}`);

  const updateAlarmsTiming = immer.produce(alarms, (draft) => {
    draft.map((alarm, i) => {
      alarm.timing = new Date(default_alarm_date + 86400 * i * 1000);
    });
  });

  return updateAlarmsTiming;
};

export const modelSetAlarmDayCompleted = (index, day) => {
  const rIndex = Number(index);
  const alarm = modelGetAlarm(rIndex);
  const updateAlarm = immer.produce(alarm, (draft) => {
    const cur_alarm_day = draft.alarm_days.find((el) => el.day === day);
    cur_alarm_day.active = "true";
    cur_alarm_day.completed = "true";
  });

  return updateAlarm;
};

export const modelResetAllAlarmsCompleteStateEveryWeek = () => {
  setTimeout(() => {
    const day = new Date().getDay();
    const hour = new Date().getHours();

    if (day !== 0 && hour !== 24) return;

    alarmState.alarms = immer.produce(alarmState.alarms, (draft) => {
      return draft.map((alarm) => {
        const alarm_with_timing_update = modelSetAlarmAllDaysTiming(
          alarm.index,
          alarm.time
        );

        return immer.produce(alarm_with_timing_update, (draft) => {
          draft.alarm_days.map((day) => {
            day.completed = "false";
          });
        });
      });
    });
  }, 3600 * 1000);
};

export const modelUpdateAlarmsTimingAndRemainingTimeProp = (alarmObj) => {
  const rAlarmObj = alarmObj;
  // name as alarm_days
  let updateAlarmObj = modelSetAlarmAllDaysTiming(
    false,
    rAlarmObj.time,
    false,
    rAlarmObj
  );

  const { remainingTimeInSec, remainingTimeStr } = modelGetAlarmRemainingTime(
    false,
    updateAlarmObj
  );

  updateAlarmObj = immer.produce(updateAlarmObj, (draft) => {
    draft.remainingTimeInSec = remainingTimeInSec;
    draft.remainingTimeStr = remainingTimeStr;
  });

  return updateAlarmObj;
};

const modelGetProperDayOrderAccToCurDay = (
  include_cur_day_next_week = false
) => {
  console.log("next", include_cur_day_next_week);
  const daysArr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const curDay = getCurDay();

  let cur_day_index = daysArr.indexOf(curDay);
  cur_day_index = cur_day_index === daysArr.length - 1 ? 0 : cur_day_index;

  const new_days_arr = immer.produce(daysArr, (draft) => {
    const new_day_arr = include_cur_day_next_week
      ? draft.slice(cur_day_index + 1)
      : draft.slice(cur_day_index);
    const left_day_count = draft.length - new_day_arr.length - 1;
    new_day_arr.push(...draft.slice(0, left_day_count + 1));
    return new_day_arr;
  });

  return new_days_arr;
};

export const modelIncreaseAlarmDayRingTime = (index, day, time) => {
  const rIndex = Number(index);
  const alarm = modelGetAlarm(rIndex);
  const updateAlarm = immer.produce(alarm, (draft) => {
    const cur_alarm_day = draft.alarm_days.find((el) => el.day === day);
    cur_alarm_day.timing =
      Number(cur_alarm_day.timing) + Number(time) * 60 * 1000;

    const { remainingTimeInSec, remainingTimeStr } =
      modelCalulateRemainingTimeProps(cur_alarm_day.timing);

    draft.remainingTimeInSec = remainingTimeInSec;
    draft.remainingTimeStr = remainingTimeStr;
  });

  console.log(updateAlarm);

  return updateAlarm;
};

// modelGetProperDayOrderAccToCurDay();

// modelSetAlarmAllDaysTiming(2, "10:00", true);
