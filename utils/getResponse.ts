import { isInvalidRequest } from "./isInvalidRequest";
import { controller } from "../controller";
import { checkMethod } from "./checkMethod";
import { IncomingMessage } from "http";
import { AVAILABLE_METHODS } from "./../constants/availableMethods";
import { DBItem, Response } from "../types";

export const getResponse = (req: IncomingMessage, body: DBItem): Response => {
  const { url, method } = req;
  const id = (url as string).split("/").filter((el) => !!el)[2];

  return (
    checkMethod(method as string) ||
    isInvalidRequest(url as string, method as string) ||
    controller[method as typeof AVAILABLE_METHODS[number]](body, id)
  );
};
