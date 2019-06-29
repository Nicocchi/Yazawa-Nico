const Discord = require("discord.js");
const moment = require("moment");
const axios = require("axios");

//  Description: Send some love gems to a user
//  Usage: send arg1
exports.run = async (client, message, args, level) => {
  try {
    // Set user
    const user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

    if (!user) return message.channel.send("You need to specify a user to send to~");

    // Set amount
    const amount = args[1];
    if (!amount) return message.channel.send("You need to specify an amount to send~");

    // Set the send
    const res = await axios.post('http://localhost:8000/users/send', {'discord_id': message.author.id, 'name': message.author.username, 'mentioned_id': user.id, 'sendAmount': amount, 'mentioned_name': user.displayName });
    const userProfile = res.data;

    // Send message
    message.channel.send(userProfile.message);

  } catch (error) {
    message.channel.send(`Unable to send Love Gems due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Send | ${error.response}\``);
  }
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "send",
  category: "Currency",
  description: "Send some love gems to a user",
  usage: "send <user> [amount]"
};
