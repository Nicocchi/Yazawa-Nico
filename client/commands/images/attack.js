const { MessageEmbed } = require("discord.js");
//  Description: Display the attack image.
//  Usage: attack arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first());

  client
    .parseJSON("./JSON/attack.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is attacking thin air OwO`;
      } else {
        var msg = "_ _";
        const nicofight = client.emojis.cache.find(emo => emo.name === 'nicofight')
        user.id === client.user.id ? message.channel.send(`${nicofight} You dare attack an idol!?`) : `${message.author.username} is attacking ${
          user.user.username
        }!`;
      }

      let embed = new MessageEmbed()
        .addField(`⋋_⋌`, msg)
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
  name: "attack",
  category: "Image",
  description: "Display the attack image",
  usage: "angry <user>"
};
