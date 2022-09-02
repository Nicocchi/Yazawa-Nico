const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Pull your daily loveca"),

  async execute(interaction) {
    try {
      const res = await axios.post(`${process.env.BE_URL}/users/daily`, {
        discord_id: interaction.user.id,
        name: interaction.guild.name,
        rip: 1,
      });

      const user = res.data;
      await interaction.deferReply()
      await interaction.editReply({
        content: user.message,
      });
    } catch (error) {
      await interaction.deferReply()
      await interaction.editReply({
        content: "An unexpected error has occured...",
        ephemeral: true,
      });
    }
  },
};
