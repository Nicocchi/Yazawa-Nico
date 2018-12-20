const Discord = require("discord.js");
//  Description: Display the scared image.
//  Usage: scared arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/scared.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is scared!!`;
      } else {
        var msg = `${message.author} is scared from ${user.user}!!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`〣( ºΔº )〣`, msg)
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
  name: "scared",
  category: "Image",
  description: "Display the scared image",
  usage: "scared <user>"
};
