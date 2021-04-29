const { MessageEmbed } = require("discord.js");
//  Description: Display the catch image.
//  Usage: catch arg1
exports.run = async (client, message, args, level) => {
  let user = message.guild.member(message.mentions.users.first());

  client
    .parseJSON("./JSON/catch.json")
    .then((res) => {
      if (!user) {
        var msg = `${message.author.username} is catching thin air`;
      } else {
        var msg = "_ _";
        const nicofight = client.emojis.cache.find(
          (emo) => emo.name === "nicofight"
        );
        user.id === client.user.id
          ? message.channel.send(`${nicofight} Oi... come here!`)
          : `${message.author.username} is trying to catch ${user.user.username}!`;
      }

      let embed = new MessageEmbed()
        .addField(`☆ﾐ(o*･ω･)ﾉ`, msg)
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
  name: "catch",
  category: "Image",
  description: "Display the catch image",
  usage: "catch <user>",
};
