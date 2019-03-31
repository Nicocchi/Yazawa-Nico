const Discord = require("discord.js");
//  Description: Display the protect image.
//  Usage: protect arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/protect.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is protecting themself!`;
      } else {
        var msg = `${message.author.username} is protecting ${
          user.user.username
        }!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`⋋_⋌`, msg)
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
  name: "protect",
  category: "Image",
  description: "Display the protect image",
  usage: "protect <user>"
};
