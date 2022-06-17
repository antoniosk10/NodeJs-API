import { validate as uuidValidate } from "uuid";

type Response = {
  status?: number;
  message?: string;
};

export const isInvalidRequest = (url: string, method: string) => {
  const response: Response = {};
  const urlParts = url.split("/").filter((el) => !!el);
  const [path, id] = urlParts;
  if (path !== "users" || urlParts.length > 2) {
    response.status = 404;
    response.message = "Resource Not Found";
    return response;
  } else if (!uuidValidate(id) && urlParts.length !== 1) {
    response.status = 400;
    response.message = "ID is not valid";
    return response;
  } else if (method === "POST" && id) {
    response.status = 404;
    response.message = "Resource Not Found";
    return response;
  }

  return false;
};
