const Discord = require("discord.js");
//  Description: Display the lick image.
//  Usage: lick arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/lick.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is licking themself...`;
      } else {
        var msg = `${message.author.username} is licking ${
          user.user.username
        }!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`\\\\(★ω★)/`, msg)
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
  name: "lick",
  category: "Image",
  description: "Display the lick image",
  usage: "lick <user>"
};
