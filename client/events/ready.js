const DBL = require("dblapi.js");
require("dotenv").config();

module.exports = async client => {
  // Log that the bot is online
  client.logger.log(
    `${client.user.tag}, ready to serve ${client.users.size} users in ${
      client.guilds.size
    } servers.`,
    "ready"
  );

  // Make the bot have an activity
  client.user.setActivity(
    `${client.config.defaultSettings.prefix}help | ${
      client.guilds.size
    } servers`,
    { type: "PLAYING" }
  );

  const debug = process.env.DEBUG || "true";

  if (debug === "true") return client.logger.log("DEBUG MODE");

  // Set up DBL API
  const token = process.env.DBL_TOKEN || "DBL Token";
  const dbl = new DBL(token, client);

  // Post stats every 30 minutes
  setInterval(() => {
    dbl.postStats(client.guilds.size);
    client.logger.log(
      `Server count posted. Currently serving in ${client.guilds.size} servers!`
    );
  }, 1800000);
};
