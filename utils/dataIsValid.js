import {dataIsArrayOfStrings} from "./dataIsArrayOfStrings.js";

export const dataIsValid = data =>
    data.name &&
    typeof data.name === "string" &&
    data.age &&
    typeof data.age === "number" &&
    dataIsArrayOfStrings(data.hobbies);
