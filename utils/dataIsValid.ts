import { BodyRequest } from "../types.js";
import { dataIsArrayOfStrings } from "./dataIsArrayOfStrings";

export const dataIsValid = (data: BodyRequest) =>
  data.username &&
  typeof data.username === "string" &&
  data.age &&
  typeof data.age === "number" &&
  dataIsArrayOfStrings(data.hobbies) &&
  Object.keys(data).length === 3;
