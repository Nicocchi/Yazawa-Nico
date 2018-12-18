const Discord = require("discord.js");
//  Description: Get senpai to notice you
//  Usage: senpai arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  if (!user) {
    return message.reply(
      "Command usage => <prefix>senpai <user> (ex: !senpai <user>"
    );
  } else {
    var msg = `${message.author} is trying to get ${
      user.user
    } to notice them...\n\nPlease notice me senpai ಠ_ಠ`;
  }

  let embed = new Discord.RichEmbed().addField(`ಠ_ಠ`, msg).setColor("#FF4D9C");

  message.channel.send({ embed: embed });
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "senpai",
  category: "Fun",
  description: "Get senpai to notice you",
  usage: "senpai <user>"
};
