const immer = require("immer");

const obj = {
  arr: [
    {
      name: "rohit",
    },
    {
      name: "do",
    },
  ],
};
console.log(
  immer.produce(obj, (draft) => {
    const obj1 = draft.arr[0];
    obj1.name = "dino";
    
  })
);

console.log(obj);
