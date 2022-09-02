const client = require("../index");
const axios = require("axios");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    // Ignore bots
    if (message.bot) return;

    const guildRes = await axios.post(`${process.env.BE_URL}/guilds/profile`, {
      discord_id: message.guild.id,
      name: message.guild.name,
    });

    const userRes = await axios.post(`${process.env.BE_URL}/users/profile`, {
      discord_id: message.author.id,
      name: message.author.username,
    });

    // XP

    // Add user to database

    return;
  },
};
