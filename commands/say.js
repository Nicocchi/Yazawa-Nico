const Discord = require("discord.js");
//  Description: Say something with the bot
//  Usage: say *args
exports.run = async (client, message, args, level) => {
  let msg = args.join(" ");

  message.delete().catch();
  if (message.member.hasPermission("MENTION_EVERYONE")) {
    return message.channel.send(msg);
  }
  msg = msg.replace("@everyone", "everyone");
  client.logger.log(msg);
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
