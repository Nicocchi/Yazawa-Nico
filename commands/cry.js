const Discord = require("discord.js");
//  Description: Display the cry image.
//  Usage: cry arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/cry.json")
    .then(res => {
      if (!user) {
        var msg = `${
          message.author
        } is crying... Aww, let Nico give you a Nico Nii~`;
      } else {
        var msg = `${message.author} is crying because of ${
          user.user
        }... Have a Nico Nii to cheer you up~ Nico Nico Nii!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`(༎ຶ⌑༎ຶ)`, msg)
        .setColor("#FF4D9C")
        .setImage(res);

      message.channel.send({ embed: embed });
    })
    .catch(err => client.logger.log(err));
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "cry",
  category: "Image",
  description: "Display the cry image",
  usage: "cry <user>"
};
