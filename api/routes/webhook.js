const express = require("express");
const router = express.Router();
const { Telegraf } = require("telegraf");
const { log } = require("./../../logger");
const { botToken, botWebhookDomain } = require("./../../config");

// init Telegram Bot
const bot = new Telegraf(botToken);
/**
 * GET request to /webhook
 */

router.get("/", (req, res, next) => {
  res.status(200).send("ok");
  log.info(JSON.stringify(req.body));
});

/**
 * POST request to /webhook
 */

router.post("/", (req, res, next) => {
  try {
    bot.start((ctx) => {
      log.info(`ctx: ${JSON.stringtify(ctx)}`);
      ctx.reply("Welcome");
    });
    res.status(200).send("ok");
  } catch (error) {
    log.error(error);
  }

  log.info(JSON.stringify(req.body));
});

module.exports = router;
