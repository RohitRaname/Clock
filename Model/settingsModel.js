let state = {
  theme: "dark",
};

export const modelUpdateSettings = (theme) => {
  state = immer.produce(state, (draft) => {
    draft.theme = theme;
  });
};
