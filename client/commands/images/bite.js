const { MessageEmbed } = require("discord.js");
//  Description: Display the bite image.
//  Usage: bite arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  client
    .parseJSON("./JSON/bite.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author.username} is biting thin air`;
      } else {
        var msg = "_ _";
        const nicofight = client.emojis.cache.find(emo => {console.log(emo.id); return emo.name === 'nicofight'})
        user.id === client.user.id ? message.channel.send(`${nicofight} Oi... Don't touch me!`) : `${message.author.username} is biting ${user.user.username}!`;
      }

      let embed = new MessageEmbed()
        .addField(`；￣Д￣)`, msg)
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
  name: "bite",
  category: "Image",
  description: "Display the bite image",
  usage: "bite <user>"
};
