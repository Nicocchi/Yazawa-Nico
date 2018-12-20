const Discord = require("discord.js");
//  Description: Display the cuddle image.
//  Usage: cuddle arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/cuddle.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is cuddling against themself...`;
      } else {
        var msg = `Aww, ${message.author} is cuddling ${user.user}!`;
      }

      let embed = new Discord.RichEmbed()
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
  name: "cuddle",
  category: "Image",
  description: "Display the cuddle image",
  usage: "cuddle <user>"
};
