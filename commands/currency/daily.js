const Discord = require("discord.js");
const moment = require("moment");

//  Description: Get your daily love gems
//  Usage: daily
exports.run = async (client, message, args, level) => {
  const defaults = client.config.defaultUserSettings;
  if (!client.settings.has(message.author.id))
    client.settings.set(message.author.id, defaults);
  let settings = client.getUserSettings(message.author.id);

  // Define the current day in UTC format
  let m = moment().utc();
  // Define the difference for comparing the current and user's last daily date
  let diff = 0;

  // Get the last daily date from the user
  let daily = settings.daily;
  // Get the user's love gems
  let loveGems = settings.points;

  const dff = moment(daily).utc();

  // If the user is not using the command for the first time, set the difference for comparison
  if (daily != "time") {
    diff = dff.diff(m, "hours");
  }


  // Compare the dates and add the love gems, if already claimed, return message stating user has already claimed
  // If the user is using the command for the first time or 24 hours have passed since their last time using the
  // command
  if (daily === "time" || diff === 24) {
    daily = m;
    loveGems += 200;
    client.settings.set(message.author.id, daily, "daily");
    client.settings.set(message.author.id, loveGems, "points");
    message.channel.send(
      `:white_check_mark: ${message.author}, you claimed 200 love gems!`
    );
  } else {
    message.channel.send(
      `:negative_squared_cross_mark: ${
        message.author
      }, you have already claimed your daily love gems.`
    );
  }
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "daily",
  category: "Currency",
  description: "Get your daily love gems",
  usage: "daily"
};
