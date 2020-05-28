const { MessageEmbed } = require("discord.js");
//  Description: Display the lick image.
//  Usage: lick arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  client
    .parseJSON("./JSON/lick.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is licking themself...`;
      } else {
        var msg = "_ _";
        const nicofight = client.emojis.cache.find(emo => emo.name === 'nicofight')
        if (user.id === client.user.id) {
          message.channel.send(`${nicofight} Oi... Don't touch me you hentai!`)
          message.channel.send(`${nicofight}${nicofight}${nicofight}${nicofight}`)
          return;
        }
        
        msg = `Aww, ${message.author.username} is licking ${
          user.user.username
        }~~`;
      }

      let embed = new MessageEmbed()
        .addField(`\\\\(★ω★)/`, msg)
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
  name: "lick",
  category: "Image",
  description: "Display the lick image",
  usage: "lick <user>"
};
