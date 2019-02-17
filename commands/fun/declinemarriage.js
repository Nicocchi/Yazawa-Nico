const Discord = require("discord.js");
//  Description: Decline marriage to user
//  Usage: declinemarriage arg1
exports.run = async (client, message, args, level) => {
  // Get proposed user
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);

  // Get & set defaults if user/guild are not in DB
  if (!client.settings.has(message.author.id)) {
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

    client.settings.set(message.author.id, defaults);
  }

  if (!client.settings.has(user.user.id)) {
    const defaultss = {
      id: user.user.id,
      username: `${user.user.username}`,
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
    client.settings.set(user.user.id, defaultss);
  }

  // Set user and author settings
  const userSettings = client.settings.get(user.user.id);
  const authorSettings = client.settings.get(message.author.id);

  // Point proposals to new arrays
  let authorProposals = authorSettings.marriageProposals;
  let userSentProposals = userSettings.sentMarriageProposals;

  // Bool to determine if accepted or not
  let accepted = false;
  let isMarried = false;

  authorSettings.marriages.forEach(usr => {
    if (usr === user.user.id) return (isMarried = true);
  });

  if (isMarried) return message.reply("You are already married to this user.");

  // Loop through the proposals to check if user is in there
  authorProposals.forEach(usr => {
    if (usr === user.user.id) return (accepted = true);
  });

  if (!accepted)
    return message.channel.send(
      "You have not proposed or you are waiting for a reply to/from this user"
    );

  // Remove proposals and don't add to marriage lists

  const newAuthorProposals = authorProposals.filter(val => {
    return val !== user.user.id;
  });
  const newUserProposals = userSentProposals.filter(val => {
    return val !== message.author.id;
  });

  client.settings.set(
    message.author.id,
    newAuthorProposals,
    "marriageProposals"
  );

  client.settings.set(user.user.id, newUserProposals, "sentMarriageProposals");
  message.channel.send(
    `You have declined ${user.user.username}'s marriage proposal.`
  );
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
