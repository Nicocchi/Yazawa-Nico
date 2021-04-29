const { MessageEmbed } = require("discord.js");
//  Description: Display the lewd image.
//  Usage: lewd arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  client
    .parseJSON("./JSON/lewd.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is lewding themself... Nani!?`;
      } else {
        var msg = "_ _";
        const nicofight = client.emojis.cache.find(emo => emo.name === 'nicofight')
        if (user.id === client.user.id) {
          message.channel.send(`${nicofight} Oi... Don't touch me you hentai!`)
          message.channel.send(`${nicofight}${nicofight}${nicofight}${nicofight}`)
          return;
        }
        
        msg = `Aww, ${message.author.username} is lewding ${
          user.user.username
        }~~`;
      }

      let embed = new MessageEmbed()
        .addField(`O///O`, msg)
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
  name: "lewd",
  category: "Image",
  description: "Display the lewd image",
  usage: "lewd <user>"
};
