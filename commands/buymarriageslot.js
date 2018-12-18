const Discord = require("discord.js");
//  Description: Buy a marriage slot
//  Usage: buymarriageslot arg1
exports.run = async (client, message, args, level) => {
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

  // Set user and author settings
  const authorSettings = client.settings.get(message.author.id);
  let marriageslots = authorSettings.marriageSlots;
  let amount = 0;

  switch (marriageslots) {
    case 5:
      amount = 10;
      break;
    case 6:
      amount = 4500;
      break;
    case 7:
      amount = 6500;
      break;
    case 8:
      amount = 8500;
      break;
    case 9:
      amount = 10500;
      break;
    case 10:
      return message.reply(
        "You have the maximum number of marriage slots already~"
      );
    default:
      break;
  }

  if (authorSettings.points < amount)
    return message.reply("You do not have enough Love Gems");
  const loveGems = (authorSettings.points -= amount);
  client.settings.set(message.author.id, loveGems, "points");
  marriageslots += 1;
  client.settings.set(message.author.id, marriageslots, "marriageSlots");
  message.channel.send(
    `You bought a marriage slot. You now have ${(authorSettings.marriageSlots += 1)}/10`
  );
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "buymarriageslot",
  category: "Fun",
  description: "Buy a marriage slot",
  usage: "buymarriageslot <user>"
};
