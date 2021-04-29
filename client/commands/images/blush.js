const { MessageEmbed } = require("discord.js");
//  Description: Display the blush image.
//  Usage: blush arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  client
    .parseJSON("./JSON/blush.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is blushing...`;
      } else {
        var msg = `${message.author.username} is blushing from ${
          user.user.username
        }...`;
      }

      let embed = new MessageEmbed()
        .addField(`(⁄ ⁄•⁄ω⁄•⁄ ⁄)`, msg)
        .setColor("#FF4D9C")
        .setImage(res);

      message.channel.send({ embed: embed });
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
  name: "blush",
  category: "Image",
  description: "Display the blush image",
  usage: "blush <user>"
};
