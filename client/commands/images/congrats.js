const { MessageEmbed } = require("discord.js");
//  Description: Display the congrats image.
//  Usage: congrats arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first())

  client
    .parseJSON("./JSON/congrats.json")
    .then(res => {
      if (!user) {
        var msg = `${
          message.author.username
        } is congratulating themself... Aww, let Nico give you a Nico Nii~`;
      } else {
        var msg = "_ _";
        const aniconii = client.emojis.cache.find(emo => {console.log(emo.id); return emo.name === 'aniconii'})
        user.id === client.user.id ? message.channel.send(`${aniconii} Aww thank you! It's because I'm the #1 idol in the universe!`) : `${message.author.username} is congratulating ${
          user.user.username
        }!`;
      }

      let embed = new MessageEmbed()
        .addField(`ヽ(＾Д＾)ﾉ`, msg)
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
  name: "congrats",
  category: "Image",
  description: "Display the congrats image",
  usage: "congrats <user>"
};
