const { MessageEmbed } = require("discord.js");
//  Description: Display the laugh image.
//  Usage: laugh arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  client
    .parseJSON("./JSON/laugh.json")
    .then(res => {
      if (!user) {
        var msg = `${
          message.author.username
        } is laughing from something... hmmm`;
      } else {
        var msg = `${message.author.username} is laughing from ${
          user.user.username
        }!`;
      }

      let embed = new MessageEmbed()
        .addField(`｡ﾟ( ﾟ^∀^ﾟ)ﾟ｡`, msg)
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
  name: "laugh",
  category: "Image",
  description: "Display the laugh image",
  usage: "laugh <user>"
};
