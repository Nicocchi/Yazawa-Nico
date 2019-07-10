const Discord = require("discord.js");
//  Description: Display the kiss image.
//  Usage: kiss arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/kiss.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is kissing themself...`;
      } else {
        var msg = `Aww, ${message.author.username} is kissing ${
          user.user.username
        }~~`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`☆⌒ヽ(*'､^*)chu`, msg)
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
  name: "kiss",
  category: "Image",
  description: "Display the kiss image",
  usage: "kiss <user>"
};
