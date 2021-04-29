const { MessageEmbed } = require("discord.js");
//  Description: Display the smug image.
//  Usage: smug arg1
exports.run = async (client, message, args, level) => {
  let user = message.guild.member(message.mentions.users.first());

  client
    .parseJSON("./JSON/smug.json")
    .then((res) => {
      if (!user) {
        var msg = `${message.author.username} is being smug ( ‾́ ◡ ‾́ )`;
      }

      let embed = new MessageEmbed()
        .addField(`( ‾́ ◡ ‾́ )`, msg)
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
  name: "smug",
  category: "Image",
  description: "Display the smug image",
  usage: "smug <user>",
};
