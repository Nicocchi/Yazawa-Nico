const { MessageEmbed } = require("discord.js");
//  Description: Display the cook image.
//  Usage: cook arg1
exports.run = async (client, message, args, level) => {
  let user = message.guild.member(message.mentions.users.first());

  client
    .parseJSON("./JSON/bite.json")
    .then((res) => {
      if (!user) {
        var msg = `${message.author.username} is cooking`;
      }

      let embed = new MessageEmbed()
        .addField(`( ˘▽˘)っ♨`, msg)
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
  name: "cook",
  category: "Image",
  description: "Display the cook image",
  usage: "cook <user>",
};
