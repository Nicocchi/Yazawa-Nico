const Discord = require("discord.js");
//  Description: Display the wasted image.
//  Usage: wasted arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/wasted.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is wasted...`;
      } else {
        var msg = `${message.author} is wasted from ${user.user}...`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`T_T`, msg)
        .setColor("#FF4D9C")
        .setImage(res);

      message.channel.send({ embed: embed });
    })
    .catch(err => client.logger.log(err, "Error"));
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "wasted",
  category: "Image",
  description: "Display the wasted image",
  usage: "wasted <user>"
};
