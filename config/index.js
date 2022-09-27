const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT,

  // Telegram bot
  botToken: process.env.BOT_TOKEN,
  botWebhookDomain: process.env.BOT_WEBHOOK_DOMAIN,
};
