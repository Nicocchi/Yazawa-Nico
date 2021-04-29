const { MessageEmbed } = require("discord.js");
//  Description: Display the wink image.
//  Usage: wink arg1
exports.run = async (client, message, args, level) => {
  let user = message.guild.member(message.mentions.users.first());

  client
    .parseJSON("./JSON/wink.json")
    .then((res) => {
      if (!user) {
        var msg = `${message.author.username} is winking (๑˃ᴗ˂)ﻭ`;
      } else {
        var msg = "_ _";
        const nicofight = client.emojis.cache.find(
          (emo) => emo.name === "nicofight"
        );
        user.id === client.user.id
          ? message.channel.send(
              `${nicofight} Oi... Why are you winking at me aho!`
            )
          : `${message.author.username} is winking at ${user.user.username}!`;
      }

      let embed = new MessageEmbed()
        .addField(`(๑˃ᴗ˂)ﻭ`, msg)
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
  name: "wink",
  category: "Image",
  description: "Display the wink image",
  usage: "wink <user>",
};
