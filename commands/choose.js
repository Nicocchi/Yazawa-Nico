const Discord = require("discord.js");
//  Description: Display the choose image.
//  Usage: choose arg1 | *arg2
exports.run = async (client, message, args, level) => {
  // Join the arguments into an array and then split them with the |
  let options = args.join(" ").split(" | ");

  // Randomly generate an index
  let i = client.randomNumber(0, options.length - 1);
  message.reply(`I choose **${options[i]}**`);
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "choose",
  category: "Fun",
  description: "Chooses a random input",
  usage: "choose [input] | [input2]"
};
