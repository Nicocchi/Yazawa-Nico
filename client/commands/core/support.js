//  Description: Displays all the available commands for your permission level.
//  Usage: prefix arg1 arg2
const Discord = require("discord.js");
const axios = require('axios');
const moment = require('moment');

exports.run = async (client, message, args, level) => {

  message.channel.send('Join our support server! https://discord.gg/cs9Sv8N');
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "support",
  category: "System",
  description: "Get invite to support server",
  usage: "support"
};
