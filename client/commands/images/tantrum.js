const { MessageEmbed } = require("discord.js");
//  Description: Display the tantrum image.
//  Usage: tantrum arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  client
    .parseJSON("./JSON/tantrum.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is throwing a tantrum!!!`;
      } else {
        var msg = `${message.author.username} is throwing a tantrum at ${
          user.user.username
        }!!!`;
      }

      let embed = new MessageEmbed()
        .addField(`(╯°□°)╯︵ ┻━┻ `, msg)
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
  name: "tantrum",
  category: "Image",
  description: "Display the tantrum image",
  usage: "tantrum <user>"
};
