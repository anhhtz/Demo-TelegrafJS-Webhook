const http = require("http");
const app = require("./app");

const { port, botToken } = require("./config");
const { log } = require("./logger");

const server = http.createServer(app);

server.listen(port);

log.info(`server [:]:${port} is running...`);
