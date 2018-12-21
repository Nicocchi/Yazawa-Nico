const Discord = require("discord.js");
//  Description: Divorce a married user
//  Usage: divorce arg1
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

  // Bool to determine if married or not
  let isMarried = false;

  authorSettings.marriages.forEach(usr => {
    if (usr === user.user.id) return (isMarried = true);
  });

  if (!isMarried) return message.reply("You are not married to this user.");

  // Remove users from marriage lists
  let authorMarriages = authorSettings.marriages.filter(usr => {
    return usr !== user.user.id;
  });
  let userMarriages = userSettings.marriages.filter(usr => {
    return usr !== message.author.id;
  });

  client.settings.set(message.author.id, authorMarriages, "marriages");
  client.settings.set(user.user.id, userMarriages, "marriages");

  message.channel.send(
    `:white_check_mark: You have divorced ${user.user.username}!`
  );
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "divorce",
  category: "Fun",
  description: "Divorce a married user",
  usage: "divorce <user>"
};
