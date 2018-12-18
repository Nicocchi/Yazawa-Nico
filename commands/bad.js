const Discord = require("discord.js");
//  Description: Display the bad image.
//  Usage: bad arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/bad.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is being bad!`;
      } else {
        var msg = `${message.author} is punishing ${
          user.user
        }, because they have been bad!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`＼('0')/／`, msg)
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
  description: "Display the bad image",
  usage: "bad <user>"
};
