const { MessageEmbed } = require("discord.js");
//  Description: Get senpai to notice you
//  Usage: senpai arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  if (!user) {
    return message.channel.send(
      "Command usage => <prefix>senpai <user> (ex: !senpai <user>"
    );
  } else {
    var msg = `${message.author.username} is trying to get ${
      user.user.username
    } to notice them...\n\nPlease notice me senpai ಠ_ಠ`;
  }

  let embed = new MessageEmbed().addField(`ಠ_ಠ`, msg).setColor("#FF4D9C");

  message.channel.send({ embed: embed });
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "senpai",
  category: "Fun",
  description: "Get senpai to notice you",
  usage: "senpai <user>"
};
