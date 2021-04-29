const { MessageEmbed } = require("discord.js");
//  Description: Display the nosebleed image.
//  Usage: nosebleed arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  client
    .parseJSON("./JSON/nosebleed.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is having a nosebleed!! `;
      } else {
        var msg = `${message.author.username} is having a nosebleed from ${
          user.user.username
        }!!`;
      }

      let embed = new MessageEmbed()
        .addField(`(*/。＼)`, msg)
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
  name: "nosebleed",
  category: "Image",
  description: "Display the nosebleed image",
  usage: "nosebleed <user>"
};
