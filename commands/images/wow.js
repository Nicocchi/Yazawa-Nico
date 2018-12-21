const Discord = require("discord.js");
//  Description: Display the wow image.
//  Usage: wow arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/wow.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is wowed!!`;
      } else {
        var msg = `${message.author} is wowed from ${user.user}!!!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`w(°ｏ°)w`, msg)
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
  name: "wow",
  category: "Image",
  description: "Display the wow image",
  usage: "wow <user>"
};
