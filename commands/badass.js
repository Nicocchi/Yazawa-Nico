const Discord = require("discord.js");
//  Description: Display the badass image.
//  Usage: badass arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/badass.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is being a badass!`;
      } else {
        var msg = `${message.author} thinks ${user.user} is a badass`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`ლಠ益ಠ)ლ`, msg)
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
  name: "bad",
  category: "Image",
  description: "Display the badass image",
  usage: "badass <user>"
};
