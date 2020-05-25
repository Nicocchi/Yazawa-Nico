const { MessageEmbed } = require("discord.js");
//  Description: Display the evil image.
//  Usage: evil arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  client
    .parseJSON("./JSON/evil.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is being evil~~ Nishishishi`;
      } else {
        var msg = `${message.author.username} and ${
          user.user.username
        } are plotting something~~`;
      }

      let embed = new MessageEmbed()
        .addField(`(＃￣ω￣)`, msg)
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
  name: "evil",
  category: "Image",
  description: "Display the evil image",
  usage: "evil <user>"
};
