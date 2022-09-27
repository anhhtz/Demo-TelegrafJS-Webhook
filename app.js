const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/init");

const app = express();

const { Telegraf } = require("telegraf");
const { botToken, botWebhookDomain } = require("./config");
// init Telegram Bot
const bot = new Telegraf(botToken);

//==============================
bot.command("test", (ctx) => {
  console.log(ctx.message.message_id);
  bot.telegram
    .sendMessage(ctx.chat.id, "my response")
    .then(({ message_id }) => console.log(message_id))
    .catch(console.error);
});
//==============================
// bot.telegram.webhookReply = false;
bot.launch({
  dropPendingUpdates: true,
  webhook: {
    domain: `${botWebhookDomain}`,
    hookPath: "/webhook",
  },
});

// app.use(bot.webhookCallback("/"));
const webhookRoutes = require("./api/routes/webhook.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(config.cors);

app.use("/webhook", webhookRoutes);

module.exports = app;
