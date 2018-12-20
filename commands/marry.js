const Discord = require("discord.js");
//  Description: Propose to a user
//  Usage: marry arg1
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

  const guildSettings = client.getSettings(message.guild.id);

  // Set user and author settings
  const userSettings = client.settings.get(user.user.id);
  const authorSettings = client.settings.get(message.author.id);

  // Bool to check if users are married or not
  let isMarried = false;

  // Checks to see if user id is in the author's marriages and sets isMarried appropriately
  authorSettings.marriages.forEach(usr => {
    if (usr === user.user.id) return (isMarried = true);
  });

  // If user is the author, return error
  if (user.user.id === message.author.id)
    return message.reply("You can't marry yourself!");

  // If the two users are already married, return error
  if (isMarried) return message.reply("You are already married to that user~");

  // If the user's aren't married and the user has available marriage slots, send proposals,
  // return error if no available marriage slots
  if (authorSettings.marriages.length <= authorSettings.marriageSlots - 1) {
    // Point proposals to new arrays
    let authorSentProposals = authorSettings.sentMarriageProposals;
    let userProposals = userSettings.marriageProposals;

    // Set the new proposals
    authorSentProposals.push(user.user.id);
    userProposals.push(message.author.id);

    client.settings.set(user.user.id, userProposals, "marriageProposals");
    client.settings.set(
      message.author.id,
      authorSentProposals,
      "sentMarriageProposals"
    );

    // Set msg and show to user
    const msg = `A marriage is a voluntary and full commitment. It is made in the deepest sense to the exclusion of all others. Before you declare your vows to on another, I want to confirm that it is your intention to be married today. **${
      user.user.username
    }**, do you come here freely to give yourself to **${
      message.author.username
    }** in marriage?`;

    let embed = new Discord.RichEmbed()
      .addField(
        `${message.author.username} has proposed to ${user.user.username}`,
        msg,
        false
      )
      .addField(
        ":white_check_mark: To accept",
        `${guildSettings.prefix}acceptmarriage @<user>`,
        true
      )
      .addField(
        ":negative_squared_cross_mark: To decline",
        `${guildSettings.prefix}declinemarriage @<user>`,
        true
      )
      .setColor("#FF4D9C");
    message.channel.send({ embed: embed });
  } else {
    message.reply("You do not have enough marriage slots~");
  }
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "marry",
  category: "Fun",
  description: "Propose to a user",
  usage: "marry <user>"
};
