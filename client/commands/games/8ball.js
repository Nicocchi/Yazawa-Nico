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
    "Hmm, appears to be true...",
    "As I see it, yes",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don’t count on it",
    "It is certain",
    "It is decidedly so",
    "Most likely",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Outlook good",
    "Reply hazy, try again",
    "Signs point to yes",
    "Very doubtful",
    "Without a doubt",
    "Yes - definitely",
    "You may rely on it"
  ];
  if (!options || options.length === 0) {
    return message.channel.send("Please ask a question~");
  }

  // Randomly generate an index
  let i = client.randomNumber(0, replies.length - 1);
  message.channel.send(`${replies[i]}`);
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
