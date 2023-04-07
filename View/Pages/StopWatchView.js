class StopWatchView {
  _parentEl = document.querySelector(".stopwatch");

  _hourEl = this._parentEl.querySelector('span[data-field="hour"]');
  _minEl = this._parentEl.querySelector('span[data-field="min"]');
  _secEl = this._parentEl.querySelector('span[data-field="sec"]');
  _miliSecEl = this._parentEl.querySelector('span[data-field="mili-sec"]');

  _timeMarkedContainer = this._parentEl.querySelector(".stopwatch-checkpoint");
  _timeMarkedList = this._parentEl.querySelector(".stopwatch-checkpoint-list");

  // variablels
  _stopwatchIntervalID;

  renderTimeMarkedList(arr) {
    const html = arr
      .map((time_marked_obj) => {
        const { index, mark_timing_rank, mark_timing, mark_timing_gap } =
          time_marked_obj;

        return `  
              <li class="stopwatch-checkpoint-item" data-index=${index} data-mark-timing=${mark_timing}>
                  <p class="t--sm stopwatch-checkpoint-item-details">
                  <span class="stopwatch-checkpoint-item-index"> ${index} </span>
                  <span class="stopwatch-checkpoint-item-mark_time_rank">${
                    mark_timing_rank ? mark_timing_rank : ""
                  }</span>
                  </p>
                  <p class="t--sm stopwatch-checkpoint-item-time">${
                    this._formatTime(mark_timing_gap).time_str
                  }</p>
                  <p class="t--sm stopwatch-checkpoint-item-total">${
                    this._formatTime(mark_timing).time_str
                  }</p>
              </li>`;
      })
      .join("");

    this._timeMarkedList.innerHTML = "";
    this._timeMarkedList.insertAdjacentHTML("beforeend", html);
  }

  // HEADER BTNS --------------------------------
  _handleExpandViewBtn(target) {
    const btn = target.closest('button[data-action="expand-stopwatch-view"]');
    if (!btn) return;

    this._parentEl.dataset.expandView = true;
  }
  _handleNormalViewBtn(target) {
    const btn = target.closest('button[data-action="normal-stopwatch-view"]');
    if (!btn) return;

    this._parentEl.dataset.expandView = false;
    this._parentEl.dataset.miniView = false;
  }
  _handleMiniViewBtn(target) {
    const btn = target.closest('button[data-action="mini-stopwatch-view"]');
    if (!btn) return;

    this._parentEl.dataset.miniView = true;
  }

  // FOOTER BTNS

  _formatTime(time_in_milisec) {
    const hour = Math.floor(time_in_milisec / (3600 * 1000));
    const min = Math.floor((time_in_milisec % (3600 * 1000)) / (60 * 1000));
    const sec = Math.floor(
      ((time_in_milisec % (3600 * 1000)) % (60 * 1000)) / 1000
    );
    const mili_sec = Math.floor(
      ((time_in_milisec % (3600 * 1000)) % (60 * 1000)) % 1000
    );

    const hour_str = hour < 10 ? `0${hour}` : hour;
    const min_str = min < 10 ? `0${min}` : min;
    const sec_str = sec < 10 ? `0${sec}` : sec;

    const duration_mili_sec = mili_sec / 10;
    const mili_sec_str =
      duration_mili_sec < 10 ? `0${duration_mili_sec}` : duration_mili_sec;

    const time_str = ` ${hour_str}:${min_str}:${sec_str}.${mili_sec_str}`;

    return { hour_str, min_str, sec_str, mili_sec_str, time_str };
  }

  _handlePlayBtn(target) {
    const btn = target.closest('button[data-action="start-stopwatch"]');
    if (!btn) return;
    this._parentEl.dataset.startStopwatch = true;

    let { timeCoveredInMiliSec } = this._parentEl.dataset;
    timeCoveredInMiliSec = Number(timeCoveredInMiliSec);

    // mutating variable outside its function
    let duration_covered_in_milisec =
      timeCoveredInMiliSec > 0 ? timeCoveredInMiliSec : 0;

    this._stopwatchIntervalID = setInterval(() => {
      duration_covered_in_milisec += 10;
      this._parentEl.dataset.timeCoveredInMiliSec = duration_covered_in_milisec;

      const { hour_str, min_str, sec_str, mili_sec_str, time_str } =
        this._formatTime(duration_covered_in_milisec);

      this._parentEl.dataset.timeStr = time_str;

      this._hourEl.textContent = hour_str;
      this._minEl.textContent = min_str;
      this._secEl.textContent = sec_str;
      this._miliSecEl.textContent = mili_sec_str;
    }, 10);
  }

  _handlePauseBtn(target, handle) {
    const btn = target.closest('button[data-action="pause-stopwatch"]');
    if (!btn) return;

    this._parentEl.dataset.startStopwatch = false;
    clearInterval(this._stopwatchIntervalID);

    const {
      timeCoveredInMiliSec: time_covered_in_mili_sec,
      timeStr: time_str,
    } = this._parentEl.dataset;
    handle("update-time-props", { time_covered_in_mili_sec, time_str });
  }
  _handleResetBtn(target, handle) {
    const btn = target.closest('button[data-action="reset-stopwatch"]');
    if (!btn) return;

    clearInterval(this._stopwatchIntervalID);
    this._parentEl.dataset.startStopwatch = false;
    this._parentEl.dataset.timeCoveredInMiliSec = 0;

    this._hourEl.textContent =
      this._minEl.textContent =
      this._secEl.textContent =
      this._miliSecEl.textContent =
        "00";

    handle("update-time-props", {
      time_str: "00:00:00.0",
      time_covered_in_mili_sec: 0,
      time_marked_arr: [],
    });
  }

  _handleMarkTimingBtn(target, handle) {
    const btn = target.closest('[data-action="bookmark-current-time"]');
    if (!btn) return;
    const { timeCoveredInMiliSec } = this._parentEl.dataset;

    const timeMarkedListArr = [
      ...this._timeMarkedContainer.querySelectorAll(
        ".stopwatch-checkpoint-item"
      ),
    ];

    // get the last item if arr is empty then not empty arr
    const timeMarkedItem = timeMarkedListArr.slice(0);

    const index =
      timeMarkedListArr.length === 0
        ? 1
        : Number(timeMarkedItem[0].dataset.index) + 1;

    const mark_timing_gap =
      timeMarkedListArr.length === 0
        ? Number(timeCoveredInMiliSec)
        : Number(timeCoveredInMiliSec) -
          Number(timeMarkedItem[0].dataset.markTiming);

    // get the new index and also marked_time_gap from previosu one

    const time_marked_obj = {
      index,
      mark_timing: timeCoveredInMiliSec,
      mark_timing_gap,
    };

    handle("add-time-marked", time_marked_obj);
  }

  addHandlerStopWatch(handle) {
    this._parentEl.addEventListener("click", (e) => {
      const target = e.target;

      // headers btns
      this._handleExpandViewBtn(target);
      this._handleNormalViewBtn(target);
      this._handleMiniViewBtn(target);

      // footer btns
      this._handlePlayBtn(target);
      this._handlePauseBtn(target, handle);
      this._handleResetBtn(target, handle);
      this._handleMarkTimingBtn(target, handle);
    });
  }
}

export default StopWatchView;
