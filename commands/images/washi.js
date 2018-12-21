const Discord = require("discord.js");
//  Description: Display the washi image.
//  Usage: washi arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/washi.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is fondling their own breasts...`;
      } else {
        var msg = `${message.author} is fondling ${user.user} breasts!!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`(つ✧ω✧)つ`, msg)
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
  name: "washi",
  category: "Image",
  description: "Display the washi image",
  usage: "washi <user>"
};
