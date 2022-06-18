import { ServerResponse } from "http";
import { Response } from "../types";

export const endRequest = (
  res: ServerResponse,
  { status, data, message }: Response
) => {
  res.statusCode = status as number;
  if (data) {
    res.end(JSON.stringify(data));
  } else {
    res.end(JSON.stringify(message));
  }
};
