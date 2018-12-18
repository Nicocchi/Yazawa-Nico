const Discord = require("discord.js");
//  Description: Say something with the bot
//  Usage: say *args
exports.run = async (client, message, args, level) => {
  let msg = args.join(" ");

  message.delete().catch();
  msg = msg.replace("@everyone", "everyone");
  message.channel.send(msg);
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "say",
  category: "Fun",
  description: "Say something with the bot",
  usage: "say <user>"
};
