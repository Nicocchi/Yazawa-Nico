const axios = require('axios');
const moment = require('moment');

//  Description: Display User Profile Stats
//  Usage: prefix arg1 arg2
exports.run = async (client, message, args, level) => {
    message.channel.send("Want to help support the bot? You can buy me a coffee at: https://ko-fi.com/nicocchi");
    
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "donate",
  category: "Miscellaneous",
  description: "Donate link",
  usage: "donate"
};