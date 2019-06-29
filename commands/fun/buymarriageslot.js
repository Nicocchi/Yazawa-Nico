const Discord = require("discord.js");
const moment = require("moment");
const axios = require("axios");

//  Description: Buy a marriage slot
//  Usage: buymarriageslot arg1
exports.run = async (client, message, args, level) => {
  try {
    // Set the marriage proposal
  const res = await axios.post('http://localhost:8000/users/buymarriageslot', {'discord_id': message.author.id, 'name': message.author.username });
  const userProfile = res.data;

  message.channel.send(userProfile.message);
  } catch (error) {
    message.channel.send(`Unable to complete buying due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Buy Marriage Slot | ${error}\``);
  }
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "buymarriageslot",
  category: "Fun",
  description: "Buy a marriage slot",
  usage: "buymarriageslot <user>"
};
