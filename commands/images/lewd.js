const Discord = require("discord.js");
//  Description: Display the lewd image.
//  Usage: lewd arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/lick.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is lewding themself... Nani!?`;
      } else {
        var msg = `${message.author} is lewding ${user.user}!`;
      }

      let embed = new Discord.RichEmbed()
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
