import {checkRequestURL} from "./checkRequestURL.js";
import {controller} from "../controller.js";
import {checkMethod} from "./checkMethod.js";

export const getResponse = (req, body) => {
    const id = req.url.split("/").filter(el => !!el)[1];

    return (
        checkMethod(req.method) ||
        checkRequestURL(req) ||
        controller[req.method](body, id)
    );
};
