const moment = require("moment");
const axios = require("axios");

//  Description: Accept marriage to user
//  Usage: acceptmarriage arg1
exports.run = async (client, message, args, level) => {
  // Get proposed user
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  try {
    // Set the marriage proposal
  const res = await axios.post('http://localhost:8000/users/acceptmarriage', {'discord_id': message.author.id, 'name': message.author.username, 'mentioned_id': user.id, 'mentioned_name': user.displayName });
  const userProfile = res.data;

  // If user is the author, return error
  if (user.user.id === message.author.id)
    return message.channel.send("You can't marry yourself!");

    message.channel.send(userProfile.message);
  } catch (error) {
    message.channel.send(`Unable to complete marriage due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Accept Marry | ${error}\``);
  }
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "acceptmarriage",
  category: "Fun",
  description: "Accept marriage to user",
  usage: "acceptmarriage <user>"
};
