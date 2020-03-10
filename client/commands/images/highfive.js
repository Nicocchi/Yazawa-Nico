const { MessageEmbed } = require("discord.js");
//  Description: Display the highfive image.
//  Usage: highfive arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  client
    .parseJSON("./JSON/highfive.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is highfiving thin air...`;
      } else {
        var msg = `${message.author.username} is highfiving ${
          user.user.username
        }!`;
      }

      let embed = new MessageEmbed()
        .addField(`ヽ(＾Д＾)ﾉヽ(＾Д＾)ﾉ`, msg)
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
  name: "highfive",
  category: "Image",
  description: "Display the highfive image",
  usage: "highfive <user>"
};
