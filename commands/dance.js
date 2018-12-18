const Discord = require("discord.js");
//  Description: Display the dance image.
//  Usage: dance arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/dance.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is dancing~~`;
      } else {
        var msg = `Aww, ${message.author} is dancing with ${user.user}~~`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`٩(θ‿θ)۶`, msg)
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
  name: "dance",
  category: "Image",
  description: "Display the dance image",
  usage: "dance <user>"
};
