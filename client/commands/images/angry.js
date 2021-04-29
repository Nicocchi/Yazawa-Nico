const { MessageEmbed } = require("discord.js");
//  Description: Display the angry image.
//  Usage: angry arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first());

  client
    .parseJSON("./JSON/angry.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is angry!`;
      } else {
        var msg = "_ _";
        user.id === client.user.id ? message.channel.send("OI! BAKA JA NE NO!?") : msg = `${message.author.username} is angry at ${
          user.user.username
        }!`;
      }

      let embed = new MessageEmbed()
        .addField(`((╬◣﹏◢))`, msg)
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
  name: "angry",
  category: "Image",
  description: "Display the angry image",
  usage: "angry <user>"
};
