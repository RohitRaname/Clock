"use strict";
let state = {
  clocks: [
    {
      index: 1,
      day_state: "night",
      time: "6:31",
      location: "Asia/Seoul",
      date: "14/10/2030",
      time_comparision_str: "+10hrs 30mins",
    },
  ],
};

export const modelGetClocks = () =>
  immer.produce(state, (draft) => draft.clocks);

export const modelGetClock = (index) =>
  immer.produce(state, (draft) =>
    draft.clocks.find((el) => Number(el.index) === Number(index))
  );

export const modelDeleteClock = (index) => {
  state = immer.produce(state, (draft) => {
    draft.clocks.splice(Number(index) - 1, 1);
  });
};

export const modelAddClock = (clockObj) => {
  state = immer.produce(state, (draft) => {
    draft.clocks.push(clockObj);
  });
};

export const modelUpdateClock = (index, updateProps) => {
  const rIndex = Number(index);

  // obj new Create but reference obj inside are same
  const clock = modelGetClock(rIndex);

  const updateClock = immer.produce(clock, (draft) => {
    // expensive thing to copy a obj

    const updatePropArr = Object.entries(updateProps);
    updatePropArr.map((prop) => {
      if (prop[1] === undefined) return;
      draft[prop[0]] = prop[1];

      return draft;
    });
    return draft;
  });

  state = immer.produce(state, (draft) => {
    draft.clocks.splice(rIndex - 1, 1, updateClock);
    return draft;
  });
};
