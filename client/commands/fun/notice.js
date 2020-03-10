const { MessageEmbed } = require("discord.js");
//  Description: Notice senpai
//  Usage: notice arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  if (!user) {
    return message.channel.send(
      "Command usage => <prefix>notice <user> (ex: !notice <user>"
    );
  } else {
    var msg = `${message.author.username} has noticed ${user.user.username}`;
  }

  let embed = new MessageEmbed()
    .addField(`(≧▽≦)`, msg)
    .setColor("#FF4D9C");

  message.channel.send({ embed: embed });
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "notice",
  category: "Fun",
  description: "Notice senpai",
  usage: "notice <user>"
};
