require("dotenv").config();

const config = {
  // Bot Owner, level 10 by default. Must be User ID.
  ownerID: process.env.OWNERID || "Import OWNERID from your .env file",

  // Bot Admins, level 9 by default. Array of user ID strings.
  admins: [],

  // Bot Support, level 8 by default. Array of user ID strings.
  support: [],

  // Bot Token
  token: process.env.TOKEN || "Import TOKEN from your .env file",

  // Default per-server settings. New guilds have these settings.

  // CAN NOT BE LEFT BLANK

  defaultSettings: {
    prefix: "$",
    modLogChannel: "mod-log",
    modRole: "Moderator",
    adminRole: "Administrator",
    systemNotice: "true", // This gives notice when a user tries to run a command that they do not have permission to use.
    welcomeChannel: "welcome",
    welcomeMessage: "Say hello to {{user}}, everyone! Nico Nico Nii~",
    welcomeEnabled: "false",
    leaveChannel: "welcome",
    leaveMessage: "Sorry to see you leave {{user}}",
    leaveEnabled: "false",
    numberOfWarnings: 0,
    warningsBan: "false",
    warningsKick: "false",
    warningsMute: "false",
    levelEnabled: "false"
  },

  // Default per-user settings. New users have these settings.

  // CAN NOT BE LEFT BLANK

  defaultUserSettings: {
    id: 0,
    username: "username",
    points: 0,
    xp: 0,
    level: 1,
    daily: "time", // Time of daily
    dailyB: "true",
    isMuted: "false",
    afk: "false",
    afkMessage: "I am AFK right now.",
    isRPS: "false",
    isRPSGamble: "false",
    marriageProposals: [],
    sentMarriageProposals: [],
    marriages: [],
    marriageSlots: 0,
    isBuyingSlot: "false"
  },

  // PERMISSION LEVEL DEFINITIONS

  permLevels: [
    // Lowest permission level, this is for non-roled users.
    {
      level: 0,
      name: "User",
      // Don't bother checking, just return true which allows them to execute any command
      // their level allows them to.
      check: () => true
    },

    // Your permission level, the staff levels should always be above the rest of the roles.
    {
      level: 2,
      name: "Moderator",
      // The following lines check the guild the message came from for the roles.
      // Then it checks if the member then authored the message has the role.
      // If they do return true, which will allow them to execute the command in question.
      // If they don't then return false, which will prevent them from executing the command.
      check: message => {
        try {
          const modRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.modRole.toLowerCase()
          );
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    {
      level: 3,
      name: "Administrator",
      check: message => {
        try {
          const adminRole = message.guild.roles(
            find(
              r =>
                r.name.toLowerCase() ===
                message.settings.adminRole.toLowerCase()
            )
          );
          return adminRole && message.member.roles.has(adminRole.id);
        } catch (e) {
          return false;
        }
      }
    },

    // Server Owner
    {
      level: 4,
      name: "Server Owner",
      // Simple check, if the guild owner id matches the message author's ID, then it will return true, otherwise, false.
      check: message =>
        message.channel.type === "text"
          ? message.guild.ownerID === message.author.id
          : false
    },

    // Bot Support is a special inbetween level that has the equivalent of server owner access
    // to any server they joins, in order to help troubleshoot the bot on behalf of the owner.
    {
      level: 8,
      name: "Bot Support",
      // The check is by reading if and ID is part of this array.
      // Needs to change this and reboot the bot to add a support user
      check: message => config.support.includes(message.author.id)
    },

    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    {
      level: 9,
      name: "Bot Admin",
      check: message => config.admins.includes(message.author.id)
    },

    // Bot Owner, this should be the highest permission level available.
    {
      level: 10,
      name: "Bot Owner",
      // Simple check, compares the message author ID to the one stored in the config file.
      check: message => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
