const Discord = require("discord.js");
const axios = require('axios');

//  Description: Display an AFK message when someone pings you if you are away
//  Usage: prefix arg1
exports.run = async (client, message, args, level) => {
  // Get the message, if no message, set a default message
  let msg = args.join(' ');
  if (!msg || msg === "undefined") {
    msg = "I am AFK right now.";
  }
  console.log('[MSG] ', msg);

  const res = await axios.post('http://localhost:8000/users/setafkmessage', {'discord_id': message.author.id, 'username': message.author.username, 'afkMessage': msg});
  // const message = res.data;
  // console.log('[message] ', profile);
  
  message.channel.send(`${message.author.username}, marking you as away with the msg: "${msg}"`);
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "afk",
  category: "Miscellaneous",
  description: "Display an AFK message when someone pings you if you are away",
  usage: "afk <message>"
};
