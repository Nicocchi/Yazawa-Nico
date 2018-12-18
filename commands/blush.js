const Discord = require("discord.js");
//  Description: Display the blush image.
//  Usage: blush arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/blush.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is blushing...`;
      } else {
        var msg = `${message.author} is blushing from ${user.user}...`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`(⁄ ⁄•⁄ω⁄•⁄ ⁄)`, msg)
        .setColor("#FF4D9C")
        .setImage(res);

      message.channel.send({ embed: embed });
    })
    .catch(err => client.logger.log(err, "Error"));
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "blush",
  category: "Image",
  description: "Display the blush image",
  usage: "blush <user>"
};
