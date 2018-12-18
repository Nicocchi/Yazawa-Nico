const Discord = require("discord.js");
//  Description: Display the pat image.
//  Usage: pat arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/pat.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is patting themself~`;
      } else {
        var msg = `${message.author} is patting ${user.user}~~`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`(ｏ・_・)ノ”(ノ_<、)`, msg)
        .setColor("#FF4D9C")
        .setImage(res);

      message.channel.send({ embed: embed });
    })
    .catch(err => client.logger.log(err));
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "pat",
  category: "Image",
  description: "Display the pat image",
  usage: "pat <user>"
};
