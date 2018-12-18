const Discord = require("discord.js");

//  Description: Display an AFK message when someone pings you if you are away
//  Usage: prefix arg1

exports.run = async (client, message, args, level) => {
  // Setup default config if user is not in DB
  const defaults = {
    id: message.author.id,
    username: `${message.author.username}`,
    points: 0,
    xp: 0,
    level: 1,
    daily: "time", // Time of daily
    isMuted: false,
    afk: false,
    afkMessage: "I am AFK right now.",
    isRPS: false,
    isRPSGamble: false,
    marriageProposals: [],
    sentMarriageProposals: [],
    marriages: [],
    marriageSlots: 5,
    isBuyingSlot: false
  };

  if (!client.settings.has(message.author.id))
    client.settings.set(message.author.id, defaults);

  // Get the message, if no message, set a default message
  let msg = args[0];
  if (!msg || msg === "undefined") {
    msg = "I am AFK right now.";
  }

  // Save the settings
  client.settings.set(message.author.id, true, "afk");
  client.settings.set(message.author.id, msg, "afkMessage");

  // Return a reply
  message.reply(`Marking you as away with the msg ${msg}`);
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "afk",
  category: "Miscellaneous",
  description: "Display an AFK message when someone pings you if you are away",
  usage: "afk <message>"
};
