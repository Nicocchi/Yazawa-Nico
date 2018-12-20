const Discord = require("discord.js");
//  Description: Display the peek image.
//  Usage: peek arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/peek.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is peeking~~`;
      } else {
        var msg = `${message.author} is peeking at ${user.user}~~`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`(o-_-o)`, msg)
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
  name: "peek",
  category: "Image",
  description: "Display the peek image",
  usage: "peek <user>"
};
