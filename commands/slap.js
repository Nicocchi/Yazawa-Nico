const Discord = require("discord.js");
//  Description: Display the slap image.
//  Usage: slap arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/slap.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is slapping themself!!`;
      } else {
        var msg = `${message.author} is slapping ${user.user}!!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`(╯°□°)╯`, msg)
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
  name: "slap",
  category: "Image",
  description: "Display the slap image",
  usage: "slap <user>"
};
