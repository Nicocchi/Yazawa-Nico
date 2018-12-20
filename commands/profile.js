const Discord = require("discord.js");

//  Description: Display User Profile Stats
//  Usage: prefix arg1 arg2

exports.run = async (client, message, args, level) => {
  const settings = message.settings;
  // const defaults = client.config.defaultUserSettings;
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

  const overrides = client.settings.get(message.author.id);

  const marriageIds = overrides.marriages;
  let marriages = [];
  let marriageString = "None";

  if (marriageIds.length > 0) {
    marriageIds.forEach(usrId => {
      client.logger.log(usrId);
      let usrSettings = client.settings.get(usrId);
      client.logger.log(usrSettings);
      if (usrSettings) {
        marriages.push(usrSettings.username);
      }
    });

    marriageString = marriages.join("\n");
  }

  let embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s Global Profile`)
    .setTimestamp()
    .setColor("#FF4D9C")
    .setThumbnail(message.author.displayAvatarURL)
    .setFooter(
      `Server member since ${message.member.joinedAt}`,
      message.author.displayAvatarURL
    )
    .addField(
      "Level & EXP",
      `${overrides.level} [${overrides.xp}/${overrides.level * 600}]`,
      true
    )
    .addField("Love Gems", `${overrides.points}`, true)
    .addField(`Marriages <:nicolove:506940178246533120>`, marriageString, true)
    .addField(`Marriage Slots`, `${overrides.marriageSlots}/10`, true);

  message.channel.send(embed);
};

exports.conf = {
  enabled: "true",
  guildOnly: "false",
  aliases: "[]",
  permLevel: "User"
};

exports.help = {
  name: "profile",
  category: "Miscellaneous",
  description: "Display User Profile Stats",
  usage: "profile"
};
