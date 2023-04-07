function formatSeconds(time) {
  if (time < 10) time = `0${time}`;
  else time = time;

  return time;
}

function formatMinutes(time) {
  if (time < 10) time = `0${time}`;
  time;
  return time;
}

function formatHour(time) {
  time = Math.floor(time / 3600);
  if (time < 10) time = `0${time}`;
  return time;
}

function formatTime(time) {
  let day, hour, minutes, seconds;

  hour = formatHour(time);

  minutes = Math.floor((time % 3600) / 60);
  minutes = formatMinutes(minutes);

  seconds = Math.floor((time % 3600) % 60);
  seconds = formatSeconds(seconds);

  return `${hour}:${minutes}:${seconds}`;
}

function advanceFormatTime(time) {
  time = formatTime(time);
  const [hour, minute, second] = time.split(":");
  if (hour === "00") return ` ${minute} minutes`;
  if (hour === "01") return `1 hour, ${minute} minutes`;
  return `${hour} hours, ${minute} minutes`;
}

// if (time > 60) {
//   minutes = Math.floor(time / 60);

//   seconds = time % 60;

//   if (seconds < 10) seconds = `0${seconds}`;
// }

// return `${minutes}:${seconds}`;

function formatCurTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  })
    .format(date)
    .split(" ")[0];
}

function changeStrTimeInSeconds(time) {
  time = time.split(":");
  time = time.map((el) => Number(el));

  const [hour, minute, second] = time;
  const duration = hour * 60 * 60 + minute * 60 + second;

  return duration;
}

///////////////////////////////////////////
function formatNumUnitIntoStr(time) {
  let [hour, minute] = time.split(":");
  hour = Number(hour);
  minute = Number(minute);

  if (hour === 0) return ` ${minute} minutes`;
  if (hour === 1) return `1 hour, ${minute} minutes`;
  return `${hour} hours, ${minute} minutes`;
}

function calculateRemainingTimeStr(timeStr) {
  let [hour, minute] = timeStr.split(":");
  hour = Number(hour);
  minute = Number(minute);

  let [curHour, curMinute] = formatCurTime(new Date()).split(":");

  curHour = Number(curHour);
  curMinute = Number(curMinute);

  let remainingHour = hour - (curHour + 12);
  let remainingMin = minute - curMinute;

  remainingHour = remainingHour <= 0 ? 0 : remainingHour;
  remainingMin = remainingMin <= 0 ? 0 : remainingMin;

  const remainingTime = `${remainingHour}:${remainingMin}:00`;

  return formatNumUnitIntoStr(remainingTime);
}

const getDayValue = (day) => {
  const daysArr = [
    { day: "Su", value: 1 },
    { day: "M", value: 2 },
    { day: "Tu", value: 3 },
    { day: "We", value: 4 },
    { day: "Th", value: 5 },
    { day: "Fr", value: 6 },
    { day: "Sa", value: 7 },
  ];

  const dayObj = daysArr.find((el) => el.day === day);
  let { value } = dayObj;

  if (value === "M") value = "Mo";

  const curMonth = new Date().getMonth() + 1;
  const curDate = new Date().getDate();
  const curYear = new Date().getFullYear();
  const alarmDate = new Date(
    `${value} ${curMonth}/${curDate}/${curYear} ${alarm_hour}:${alarm_minute}`
  );
  return value;
};

const getCurDay = () => {
  const str = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date()
  );
  let day = str.slice(0, 2);
  if (day === "Mon" || day === "Mo") day = "Mo";
  return day;
};

function calculateRemainingTimeStrInDays(day_left, hour_left, min_left) {
  // const day_left = Math.floor(remainingTimeInSec / (86400 * 1000));

  // const hour = Math.floor(
  //   (Number(remainingTimeInSec) - day_left * 86400 * 1000) / (3600 * 1000)
  // );

  // const minute = Math.ceil(
  //   (Number(remainingTimeInSec) -
  //     (day_left * 86400 * 1000 + hour * 3600 * 1000)) /
  //     (60 * 1000)
  // );

  const dayUnit = day_left <= 0 ? "" : day_left > 1 ? "days," : "day,";
  const hourUnit = hour_left <= 0 ? "" : hour_left === 1 ? "hour," : "hours,";
  const minuteUnit = min_left <= 0 ? "" : min_left === 1 ? "minute" : "minutes";

  return `${day_left === 0 ? "" : day_left} ${dayUnit} ${
    hour_left === 0 ? "" : hour_left
  } ${hourUnit} ${min_left === 0 ? "" : min_left} ${minuteUnit}`;
}

const getCurHourAndMin = () => {
  const curTime = formatCurTime(new Date());

  const [hour, min] = curTime.split(":");
  return `${Number(hour) + 12}:${min}`;
};

// DEPENDENT ------------------------------------------------

const calAlarmTimeProp = (
  day_left,
  alarm_hour,
  alarm_minute,
  oneTime = false
) => {
  // new Date("8/15/2022 9:41")
  const curMonth = new Date().getMonth() + 1;
  const curDate = new Date().getDate() + day_left;
  const curYear = new Date().getFullYear();
  const alarmDate = new Date(
    `${curMonth}/${curDate}/${curYear} ${alarm_hour}:${alarm_minute}`
  );

  const curDateSec = +new Date();
  const remainingTimeInSec = alarmDate - curDateSec;

  // hour = day - sec )/3600
  // minute= day - sec )%3600 remainder minute

  let hour_left = Math.abs(
    Math.floor(
      (Number(remainingTimeInSec) - day_left * 86400 * 1000) / (3600 * 1000)
    )
  );

  let min_left = Math.floor(
    Math.abs(
      ((day_left * 86400 * 1000 - Number(remainingTimeInSec)) / (3600 * 1000)) %
        (60 * 1000)
    )
  );

  return { hour_left, min_left, remainingTimeInSec };
};

const calculateRemainingTimeForDailyAlarm = (
  day_left,
  alarm_hour,
  alarm_minute
) => {
  return calAlarmTimeProp(day_left, alarm_hour, alarm_minute);
};

const calculateRemainingTimeForOneTimeAlarm = (
  day_left,
  alarm_hour,
  alarm_minute
) => {
  const timeProp = calAlarmTimeProp(day_left, alarm_hour, alarm_minute, true);

  return timeProp;
};

const calculateRemainingTimeProps = (timeStr, day, oneTimeAlarm = false) => {
  const dayValue = getDayValue(day);
  const curDay = getCurDay();
  const curDayValue = getDayValue(curDay);

  let day_left = Math.abs(dayValue - curDayValue);
  const [alarm_hour, alarm_minute] = timeStr.split(":");

  let hour_left, min_left, remainingTimeInSec;

  if (!oneTimeAlarm) {
    const timeProp = calculateRemainingTimeForDailyAlarm(
      day_left,
      alarm_hour,
      alarm_minute
    );
    hour_left = timeProp.hour_left;
    min_left = timeProp.min_left;
    remainingTimeInSec = timeProp.remainingTimeInSec;
  }

  if (oneTimeAlarm) {
    day_left = day_left + 1;
    const timeProp = calculateRemainingTimeForOneTimeAlarm(
      day_left,
      alarm_hour,
      alarm_minute
    );

    day_left = 0;
    hour_left = timeProp.hour_left;
    min_left = timeProp.min_left;
    remainingTimeInSec = timeProp.remainingTimeInSec;
  }

  const remainingTimeStr = calculateRemainingTimeStrInDays(
    day_left,
    hour_left,
    min_left
  );

  return { remainingTimeInSec, remainingTimeStr };
};

const calculateTimeFromSeconds = (remainingTimeInSec) => {
  const newDate = new Date(+new Date() + Number(remainingTimeInSec));
  const curTime = formatCurTime(newDate);
  const [hour, min] = curTime.split(":");
  return `${Number(hour) + 12}:${min}`;
};

export {
  formatTime,
  formatCurTime,
  changeStrTimeInSeconds,
  advanceFormatTime,
  calculateRemainingTimeStr,
  calculateRemainingTimeStrInDays,
  getCurDay,
  calculateRemainingTimeProps,
  calculateTimeFromSeconds,
};
