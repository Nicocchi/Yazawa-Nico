const { MessageEmbed } = require("discord.js");
//  Description: Display the sleepy image.
//  Usage: sleepy arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  client
    .parseJSON("./JSON/sleepy.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is sleepy....`;
      } else {
        var msg = `${message.author.username} is tired from ${
          user.user.username
        }...`;
      }

      let embed = new MessageEmbed()
        .addField(`￣o￣) zzZZzzZZ`, msg)
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
  name: "sleepy",
  category: "Image",
  description: "Display the sleepy image",
  usage: "sleepy <user>"
};
