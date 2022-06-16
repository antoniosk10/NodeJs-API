export const dataIsArrayOfStrings = (array: Array<any>) =>
  Array.isArray(array) && array.every((el) => typeof el === "string");
