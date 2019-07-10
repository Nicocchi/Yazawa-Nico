const Discord = require("discord.js");
const moment = require("moment");
const axios = require("axios");

//  Description: Get your daily love gems
//  Usage: daily
exports.run = async (client, message, args, level) => {
  try {
    // Set the daily
    const res = await axios.post('http://localhost:8000/users/daily', {'discord_id': message.author.id, 'name': message.guild.name, 'rip': 1 });
    const user = res.data;

    // Send message
    message.channel.send(user.message);

  } catch (error) {
    message.channel.send(`Unable to receive Love Gems due to an error. If encountered, please send to developers. (!support to get invite link) \n\`[${moment().utc()}] Daily | ${error.response}\``);
  }
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "daily",
  category: "Currency",
  description: "Get your daily love gems",
  usage: "daily"
};
