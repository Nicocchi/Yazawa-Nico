//  Description: Give a cucumber to someone
//  Usage: cucumber arg1
exports.run = async (client, message, args, level) => {
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  if (!user) {
    var msg = `You got a :cucumber: from yourself\n\n(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ :cucumber:`;
  } else {
    var msg = `${user.user}, you got a :cucumber: from ${
      message.author.username
    }\n\n(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ :cucumber:`;
  }
  message.channel.send(msg);
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "cucumber",
  category: "Fun",
  description: "Give a cucumber to someone",
  usage: "cucumber <user>"
};
