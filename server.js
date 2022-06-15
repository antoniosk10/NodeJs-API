import "dotenv/config";
import http from "http";
import {endRequest} from "./utils/endRequest.js";
import {getResponse} from "./utils/getResponse.js";

const {PORT} = process.env;

export const server = http.createServer((req, res) => {
    let body = [];
    res.setHeader("Content-Type", "application/json");

    req.on("error", err => {
        endRequest(res, {status: 500, message: "Something went wrong"});
    })
        .on("data", chunk => {
            body.push(chunk);
        })
        .on("end", () => {
            try {
                body = body.length ? JSON.parse(body) : body;
                const responseData = getResponse(req, body);
                endRequest(res, responseData);
            } catch {
                endRequest(res, {status: 500, message: "Something went wrong"});
            }
        });
});

server.listen(PORT, "localhost", error => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});
