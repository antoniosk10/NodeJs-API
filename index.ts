import cluster from "cluster";
import os from "os";
import { newServer } from "./server";

if (cluster.isPrimary) {
  os.cpus().forEach(() => cluster.fork());
  cluster.on("online", function (worker) {
    console.log("Worker " + worker.process.pid + " is online");
  });

  cluster.on("exit", function (worker, code, signal) {
    console.log(
      "Worker " +
        worker.process.pid +
        " died with code: " +
        code +
        ", and signal: " +
        signal
    );
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  newServer();
}
