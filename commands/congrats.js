const Discord = require("discord.js");
//  Description: Display the congrats image.
//  Usage: congrats arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/congrats.json")
    .then(res => {
      if (!user) {
        var msg = `${
          message.author
        } is congratulating themself... Aww, let Nico give you a Nico Nii~`;
      } else {
        var msg = `${message.author} is congratulating ${user.user}!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`ヽ(＾Д＾)ﾉ`, msg)
        .setColor("#FF4D9C")
        .setImage(res);

      message.channel.send({ embed: embed });
    })
    .catch(err => client.logger.log(err, "Error"));
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "congrats",
  category: "Image",
  description: "Display the congrats image",
  usage: "congrats <user>"
};
