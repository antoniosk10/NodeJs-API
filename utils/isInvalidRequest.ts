import { validate as uuidValidate } from "uuid";

type Response = {
  status?: number;
  message?: string;
};

export const isInvalidRequest = (url: string, method: string) => {
  const response: Response = {};
  const urlParts = url.split("/").filter((el) => !!el);
  const [firstPath, secondPath, id] = urlParts;
  if (firstPath !== "api" || secondPath !== "users" || urlParts.length > 3) {
    response.status = 404;
    response.message = "Resource Not Found";
    return response;
  } else if (!uuidValidate(id) && urlParts.length === 3 && method !== "POST") {
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
