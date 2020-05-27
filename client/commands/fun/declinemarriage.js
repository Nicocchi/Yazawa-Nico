const moment = require("moment");
const axios = require("axios");

//  Description: Decline marriage to user
//  Usage: declinemarriage arg1
exports.run = async (client, message, args, level) => {
  // Get proposed user
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  try {
    // Set the marriage proposal
  const res = await axios.post(`${process.env.BE_URL}/users/declinemarriage`, {'discord_id': message.author.id, 'name': message.author.username, 'mentioned_id': user.id, 'mentioned_name': user.displayName });
  const userProfile = res.data;

  // If user is the author, return error
  if (user.user.id === message.author.id)
    return message.channel.send("You can't divorce yourself!");

      message.channel.send(userProfile.message);
  } catch (error) {
    message.channel.send(`Unable to complete marriage due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Divorce | ${error}\``);
  }
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "declinemarriage",
  category: "Fun",
  description: "Decline marriage to user",
  usage: "declinemarriage <user>"
};
