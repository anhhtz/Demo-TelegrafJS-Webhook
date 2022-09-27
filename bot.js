const { Telegraf } = require("telegraf");
const express = require("express");
const { botToken, botWebhookDomain, port } = require("./config");

const app = express();
const bot = new Telegraf(botToken);

(async () => {
  app.use(await bot.createWebhook({ domain: `${botWebhookDomain}` }));

  bot.on("text", (ctx) => ctx.reply("Hello"));

  app.listen(port, () => console.log("Listening on port", port));
})();
