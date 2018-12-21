const Discord = require("discord.js");
//  Description: Display wisdom quotes
//  Usage: wisdom arg1
exports.run = async (client, message, args, level) => {
  client
    .parseJSON("./JSON/wisdom.json")
    .then(res => {
      message.channel.send(res);
    })
    .catch(err => client.logger.log(err));
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "wisdom",
  category: "Fun",
  description: "Display wisdom quotes",
  usage: "wisdom <user>"
};
