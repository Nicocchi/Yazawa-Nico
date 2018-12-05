const Discord = require("discord.js");
//  Description: Display the bite image.
//  Usage: bite arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/bite.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is biting thin air`;
      } else {
        var msg = `${message.author} is biting ${user.user}!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`；￣Д￣)`, msg)
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
  name: "bite",
  category: "Image",
  description: "Display the bite image",
  usage: "bite <user>"
};
