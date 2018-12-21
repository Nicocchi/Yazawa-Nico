const Discord = require("discord.js");
//  Description: Display the hug image.
//  Usage: hug arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/hug.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is hugging themself...`;
      } else {
        var msg = `Aww, ${message.author} is hugging ${user.user}!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`(つ≧▽≦)つ`, msg)
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
  name: "hug",
  category: "Image",
  description: "Display the hug image",
  usage: "hug <user>"
};
