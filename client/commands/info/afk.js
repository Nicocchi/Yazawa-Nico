const axios = require('axios');

//  Description: Display an AFK message when someone pings you if you are away
//  Usage: prefix arg1
exports.run = async (client, message, args, level) => {
  // Get the message, if no message, set a default message
  let msg = args.join(' ');
  if (!msg || msg === "undefined") {
    msg = "I am AFK right now.";
  }

  const res = await axios.post(`${process.env.BE_URL}/users/setafkmessage`, {'discord_id': message.author.id, 'name': message.author.username, 'afkMessage': msg});
  
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
