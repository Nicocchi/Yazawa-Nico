const Discord = require("discord.js");
//  Description: Display the niconii image.
//  Usage: niconii arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/niconii.json")
    .then(res => {
      if (!user) {
        var msg = `${
          message.author
        } is saying saying Nico Nico Nii ~ Anata no heart ni Nico Nico Nii ~ Egao todokeru Yazawa Nico~ Nico Nii te oboeteru Love Nico~`;
      } else {
        var msg = `${
          message.author
        } is saying Nico Nico Nii ~ Anata no heart ni Nico Nico Nii ~ Egao todokeru Yazawa Nico~ Nico Nii te oboeteru Love Nico~ to ${
          user.user
        }!`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`<:niconi:506940178204721162>`, msg)
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
  name: "niconii",
  category: "Image",
  description: "Display the niconii image",
  usage: "niconii <user>"
};
