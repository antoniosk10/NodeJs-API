import { BodyRequest } from "../types.js";
import { dataIsArrayOfStrings } from "./dataIsArrayOfStrings";

export const dataIsValid = (data: BodyRequest) =>
  data.name &&
  typeof data.name === "string" &&
  data.age &&
  typeof data.age === "number" &&
  dataIsArrayOfStrings(data.hobbies);
