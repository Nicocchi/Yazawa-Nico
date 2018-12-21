const Discord = require("discord.js");
//  Description: Ask the 8ball
//  Usage: 8ball *arg1
exports.run = async (client, message, args, level) => {
  // Join the arguments into an array and then split them with the |
  let options = args;
  client.logger.log(options);
  let replies = [
    "Yes",
    "No",
    "I do not know",
    "Ask again later",
    "Ni-Nico Nii?",
    "Maybe",
    "Hmm, appears to be true..."
  ];
  if (!options || options.length === 0) {
    return message.reply("Please ask a question~");
  }

  // Randomly generate an index
  let i = client.randomNumber(0, replies.length - 1);
  message.reply(`${replies[i]}`);
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "8ball",
  category: "Fun",
  description: "Ask the 8ball",
  usage: "8ball [question]"
};
