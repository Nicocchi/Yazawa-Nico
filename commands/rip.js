const Discord = require("discord.js");
const moment = require("moment");
//  Description: Display rips
//  Usage: rip arg1
exports.run = async (client, message, args, level) => {
  const defaults = client.config.defaultGlobalSettings;

  if (!client.settings.has("GlobalSettings"))
    client.settings.set("GlobalSettings", defaults);
  let settings = client.getGlobalSettings();

  // let date = moment().utc();
  let totalRips = settings.totalRips;
  let todaysRips = settings.todaysRips;
  let date = settings.ripDateTime;
  let m = moment().utc();
  let currDate = m.format("YYYY-MM-DD");

  client.settings.set("GlobalSettings", totalRips + 1, "totalRips");
  if (currDate > date || date === 0) {
    client.settings.set("GlobalSettings", 1, "todaysRips");
    client.settings.set("GlobalSettings", currDate, "ripDateTime");
  } else {
    client.settings.set("GlobalSettings", todaysRips + 1, "todaysRips");
  }

  settings = client.getGlobalSettings();
  let messages = args.join(" ");

  if (messages) {
    var msg = `${
      message.author.username
    } has paid their respects for ${args.join(" ")}\n${
      settings.todaysRips
    } Today, 
    ${settings.totalRips} All`;
  } else {
    var msg = `${message.author.username} has paid their respects.\n${
      settings.todaysRips
    } Today, ${settings.totalRips} All`;
  }

  let embed = new Discord.RichEmbed().setDescription(msg).setColor("#FF4D9C");
  message.channel.send({ embed: embed });
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: ['f'],
  permLevel: "User"
};

exports.help = {
  name: "rip",
  category: "Fun",
  description: "Rest in Piece",
  usage: "rip <user>"
};
