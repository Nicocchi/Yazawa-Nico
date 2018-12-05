const Discord = require("discord.js");
//  Description: Give an item to someone
//  Usage: give arg1 arg2
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  if (!user) {
    let item = args[0];
    if (!item)
      return message.reply(
        "Command usage => <prefix>give <user> [item] (ex: !give <user> item"
      );
    var msg = `You got a ${item} from yourself\n\n(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ${item}`;
  } else {
    let item = args[1];
    if (!item) {
      message.reply(
        "Command usage => <prefix>give <user> [item] (ex: !give <user> item"
      );
      return;
    }
    var msg = `${user.user}, you got a ${item} from ${
      message.author.username
    }\n\n(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ${item}`;
  }
  message.channel.send(msg);
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "give",
  category: "Fun",
  description: "Give an item to someone",
  usage: "give <user>"
};
