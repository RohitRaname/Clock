//

// every  time related prop hhere is in milisec
let state = {
  time_covered_in_mili_sec: 0,
  time_str: "00:00:00",

  time_marked_arr: [
    // { mark_timing,mark_timing_gap}
  ],
};

// Modification related -----------------------------------------
export const modelCreateStopwatch = (stopwatch_obj) => {
  const { time_covered_in_mili_sec, time_str } = stopwatch_obj;
  state = immmer.produce(state, (draft) => {
    draft.time_covered_in_mili_sec = time_covered_in_mili_sec;

    draft.time_str = time_str;
    draft.time_covered_in_mili_sec = time_covered_in_mili_sec;
  });
};

export const modelUpdateTimeProps = (update_stopwatch_obj) => {
  const { time_covered_in_mili_sec, time_str, time_marked_arr } =
    update_stopwatch_obj;
  state = immer.produce(state, (draft) => {
    draft.time_covered_in_mili_sec = time_covered_in_mili_sec;
    draft.time_str = time_str;

    if (time_marked_arr) draft.time_marked_arr = time_marked_arr;
  });
};

export const modelAddTimeMarked = (time_marked_obj) => {
  // //
  // const add_index_to_time_marked_obj = immer.produce(
  //   time_marked_obj,
  //   (draft) => {
  //     const el_in_time_marked_arr = state.time_marked_arr.slice(-1);
  //     const index = el_in_time_marked_arr
  //       ? Number(el_in_time_marked_arr.index) + 1
  //       : 1;

  //     draft.index = index;
  //   }
  // );

  // time_marked_arr is draft obh which is immutable new prop can be assigned to it
  state = immer.produce(state, (draft) => {
    draft.time_marked_arr.push(time_marked_obj);
  });
};

// Query related -------------------------------------------------
export const modelGetStopwatch = () => immer.produce(state, (draft) => draft);

export const modelGetTimeMarkedArr = () => modelGetStopwatch().time_marked_arr;

export const modelGetTimerMarkedArrWithFastestAndSlowestTimeMarkedMention =
  () => {
    if (state.time_marked_arr.length === 0) return [];

    const sorted_time_marked_arr_by_time_gap = immer.produce(
      state.time_marked_arr,
      (draft) => {
        const sort_time_marked_arr = draft.sort(
          (a, b) => Number(a.mark_timing_gap) - Number(b.mark_timing_gap)
        );

        sort_time_marked_arr[sort_time_marked_arr.length - 1].mark_timing_rank =
          "slowest";
        sort_time_marked_arr[0].mark_timing_rank = "fastest";
        return sort_time_marked_arr.sort(
          (a, b) => Number(b.index) - Number(a.index)
        );
      }
    );

    return sorted_time_marked_arr_by_time_gap;
  };
