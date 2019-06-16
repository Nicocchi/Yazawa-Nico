// Runs anytime a message is received
// Note: Due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

const Discord = require("discord.js");

module.exports = async (client, message) => {
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

  // Ignore bots
  if (message.author.bot) return;

  // Grab the settings for this server from Enmap
  // If there is no guild, get default conf (DMs)
  // const settings = (message.settings = client.getSettings(message.guild.id));
  // client.user.setActivity(
  //   `${settings.prefix}help | ${client.guilds.size} servers`,
  //   { type: "PLAYING" }
  // );

  // Check user settings, if none, set default user settings to defaults
  if (!client.settings.has(message.author.id))
    client.settings.set(message.author.id, defaults);
  // Set user's settings variable
  const userSettings = (message.settings = client.getUserSettings(
    message.author.id
  ));

  // Checks if the bot was mentioned, with no message after it, returns the prefix.
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this guild is \`${settings.prefix}\``);
  }

  // XP
  let xpAdd = Math.floor(Math.random() * 2) + 1;

  let curxp = userSettings.xp;
  let curlvl = userSettings.level;
  let nxtlvl = curlvl * 600;

  const newxp = curxp + xpAdd;

  // Update the xp
  client.settings.set(message.author.id, newxp, "xp");

  const uUser = client.getUserSettings(message.author.id);

  // // Check level status and update levels/display level if needed
  if (uUser.xp >= nxtlvl) {
    // Update level
    client.settings.set(message.author.id, curlvl + 1, "level");
    const updatedUser = client.getUserSettings(message.author.id);

    // Display level message if guild has it enabled
    if (settings.levelEnabled) {
      message.channel.send(
        `${message.author.tag}, You have leveled up to ${updatedUser.level}!`
      );
    }
  }

  // AFK
  // Get a user if there is one mentioned
  let user = message.guild.member(message.mentions.users.first());

  // Check if there is a user, if so, check if need to call the user's afk message
  if (user) {
    const userDefaults = {
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

    if (!client.settings.has(user.user.id))
      client.settings.set(user.user.id, userDefaults);

    const userSettings2 = (message.settings = client.getUserSettings(
      user.user.id
    ));

    // If user is afk, send user's afk message
    if (userSettings2.afk) {
      let embed = new Discord.RichEmbed()
        .setTitle(`AFK`)
        .setTimestamp()
        .setColor("#FF4D9C")
        .setThumbnail(user.user.avatarURL)
        .setDescription(
          `**${
            user.user.username
          }** is currently away. They left this message:\n\n**${
            userSettings2.afkMessage
          }**`
        );

      message.channel.send(embed);
    }
  }

  // If the author is afk, set as back and return message
  if (userSettings.afk) {
    client.settings.set(message.author.id, false, "afk");
    let embed = new Discord.RichEmbed()
      .setTitle(`AFK`)
      .setTimestamp()
      .setColor("#FF4D9C")
      .setThumbnail(message.author.displayAvatarURL)
      .setDescription(
        `You are now set as back **${message.author.username}!**`
      );

    message.channel.send(embed);
  }

  // Ignore any message that does not start with the prefix
  // if (message.content.indexOf(settings.prefix) !== 0) return;
  if (!message.content.startsWith(settings.prefix)) return;

  // Seperate the 'command' name, and the 'arguments' for the command.
  const args = message.content
    .slice(settings.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  // If the member on a guild is invisible or not cached, fetch them.
  if (message.guild && !message.member)
    await message.guild.fetchMember(message.author);

  // Get the user or member's permission level from teh elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (!cmd) return;

  // Some commands may not be usable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly) {
    return message.channel.send(
      "This command is unavailable via private message. Please run this command in a guild."
    );
  }

  // Level Permission check
  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel
        .send(`You do not have permission to use this command. Your permission level is
                ${level} (${
        client.config.permLevels.find(l => l.level === level).name
      }) This command requires level
                ${client.levelCache[cmd.conf.permLevel]} (${
        cmd.conf.permLevel
      })`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is support in Dms)
  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }

  // If the command exists, **AND** the user has permission, run it
  client.logger.cmd(
    `[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${
      message.author.username
    } (${message.author.id}) ran command ${cmd.help.name}`
  );
  cmd.run(client, message, args, level);
};
