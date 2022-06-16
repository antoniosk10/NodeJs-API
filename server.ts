import "dotenv/config";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { endRequest } from "./utils/endRequest";
import { getResponse } from "./utils/getResponse";

const PORT = parseInt(<string>process.env.PORT) || 3000;

export const server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    let body: any = [];
    res.setHeader("Content-Type", "application/json");

    req
      .on("error", (err) => {
        endRequest(res, { status: 500, message: "Something went wrong" });
      })
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        try {
          body = body.length ? JSON.parse(body) : body;
          const responseData = getResponse(req, body);
          endRequest(res, responseData);
        } catch {
          endRequest(res, { status: 500, message: "Something went wrong" });
        }
      });
  }
);

server.listen(PORT, "localhost", () => {
  console.log(`listening port ${PORT}`);
});

server.on("error", (error) => {
  console.log(error);
});
