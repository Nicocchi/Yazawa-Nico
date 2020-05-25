//  Description: Displays all the available commands for your permission level.
//  Usage: prefix arg1 arg2
const axios = require('axios');
const moment = require('moment');

exports.run = async (client, message, args, level) => {

  message.channel.send('Invite Yazawa Nico to your server! https://discordapp.com/oauth2/authorize?client_id=506839796921139203&scope=bot&permissions=2146827775]');
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "invite",
  category: "System",
  description: "Invite bot to your server",
  usage: "invite"
};
