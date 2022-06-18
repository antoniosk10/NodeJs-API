import { AVAILABLE_METHODS } from "../constants/availableMethods";
import { Response } from "../types";
import { includes } from "./includes";

export const checkMethod = (method: string) => {
  const response: Response = {};
  if (includes(AVAILABLE_METHODS, method)) {
    return false;
  }
  response.status = 400;
  response.message = "Method isn't available";
  return response;
};
