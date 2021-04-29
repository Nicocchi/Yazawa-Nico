const { MessageEmbed } = require("discord.js");
//  Description: Display the hug image.
//  Usage: hug arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  client
    .parseJSON("./JSON/hug.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is hugging themself...`;
      } else {
        var msg = `Aww, ${message.author.username} is hugging ${
          user.user.username
        }!`;
      }

      let embed = new MessageEmbed()
        .addField(`(つ≧▽≦)つ`, msg)
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
  name: "hug",
  category: "Image",
  description: "Display the hug image",
  usage: "hug <user>"
};
