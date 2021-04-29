const { MessageEmbed } = require("discord.js");
//  Description: Display the bored image.
//  Usage: bored arg1
exports.run = async (client, message, args, level) => {
  let user = message.guild.member(message.mentions.users.first());

  client
    .parseJSON("./JSON/bored.json")
    .then((res) => {
      if (!user) {
        var msg = `${message.author.username} is bored...`;
      }

      let embed = new MessageEmbed()
        .addField(`(￣︿￣)`, msg)
        .setColor("#FF4D9C")
        .setImage(res);

      message.channel.send({ embed: embed });
    })
    .catch((err) => client.logger.log(err));
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "bored",
  category: "Image",
  description: "Display the bored image",
  usage: "bored <user>",
};
