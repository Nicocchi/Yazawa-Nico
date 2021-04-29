const { MessageEmbed } = require("discord.js");
//  Description: Display the greet image.
//  Usage: greet arg1
exports.run = async (client, message, args, level) => {
  let user = message.guild.member(message.mentions.users.first());

  client
    .parseJSON("./JSON/greet.json")
    .then((res) => {
      if (!user) {
        var msg = `${message.author.username} is greeting thin air`;
      } else {
        var msg = "_ _";
        user.id === client.user.id
          ? message.channel.send(`Hello~`)
          : `${message.author.username} is greeting ${user.user.username}!`;
      }

      let embed = new MessageEmbed()
        .addField(`＼(⌒▽⌒)`, msg)
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
  name: "greet",
  category: "Image",
  description: "Display the greet image",
  usage: "greet <user>",
};
