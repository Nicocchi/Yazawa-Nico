const Discord = require("discord.js");
//  Description: Display the sad image.
//  Usage: sad arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  client
    .parseJSON("./JSON/sad.json")
    .then(res => {
      if (!user) {
        var msg = `${message.author} is sad... Aww... Have a Nico Nii~`;
      } else {
        var msg = `${message.author} is being sad from ${user.user}...`;
      }

      let embed = new Discord.RichEmbed()
        .addField(`ಠ__ಠ`, msg)
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
  name: "sad",
  category: "Image",
  description: "Display the sad image",
  usage: "sad <user>"
};
