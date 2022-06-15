import {AVAILABLE_METHODS} from "../constants/availibleMethods.js";

export const checkMethod = method => {
    const response = {};
    if (AVAILABLE_METHODS.includes(method)) {
        return false;
    }
    response.status = 400;
    response.message = "Method isn't availible";
    return response;
};
