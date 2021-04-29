const { MessageEmbed } = require("discord.js");
//  Description: Display the nom image.
//  Usage: nom arg1
exports.run = async (client, message, args, level) => {
  let user = message.guild.member(message.mentions.users.first());

  client
    .parseJSON("./JSON/nom.json")
    .then((res) => {
      if (!user) {
        var msg = `${message.author.username} is nomming thin air`;
      } else {
        var msg = "_ _";
        const nicofight = client.emojis.cache.find(
          (emo) => emo.name === "nicofight"
        );
        user.id === client.user.id
          ? message.channel.send(`${nicofight} Oi... Don't touch me!`)
          : `${message.author.username} is nomming ${user.user.username}!`;
      }

      let embed = new MessageEmbed()
        .addField(`(っ˘ڡ˘ς)`, msg)
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
  name: "nom",
  category: "Image",
  description: "Display the nom image",
  usage: "nom <user>",
};
