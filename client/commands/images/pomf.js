const { MessageEmbed } = require("discord.js");
//  Description: Display the washi image.
//  Usage: pomf arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  client
    .parseJSON("./JSON/washi.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is pomfing themselves...`;
      } else {
        var msg = "_ _";
        const nicofight = client.emojis.cache.find(emo => {console.log(emo.id); return emo.name === 'nicofight'})
        if (user.id === client.user.id) {
          message.channel.send(`${nicofight} Oi... Don't touch me you hentai!`)
          message.channel.send(`${nicofight}${nicofight}${nicofight}${nicofight}`)
          return;
        }
        
        msg = `${message.author.username} is pomfing ${
          user.user.username
        }`;
      }

      let embed = new MessageEmbed()
        .addField(`(つ✧ω✧)つ`, msg)
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
  name: "pomf",
  category: "Image",
  description: "Display the pomf image",
  usage: "pomf <user>"
};
