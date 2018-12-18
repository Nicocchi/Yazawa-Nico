const Discord = require("discord.js");
//  Description: Display the attack image.
//  Usage: attack arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/attack.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is attacking thin air OwO`;
      } else {
        var msg = `${message.author} is attacking ${user.user}!`;
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
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "attack",
  category: "Image",
  description: "Display the attack image",
  usage: "angry <user>"
};
