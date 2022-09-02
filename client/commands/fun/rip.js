const { SlashCommandBuilder, EmbedBuilder, hyperlink } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rip")
    .setDescription("F")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to rip")
    ),
  async execute(interaction) {
    const res = await axios.post(`${process.env.BE_URL}/globals/rip`, {
      discord_id: interaction.guild.id,
      name: interaction.guild.name,
      rip: 1,
    });
    const global = res.data;

    const target = interaction.options.getUser("user");
    if (target) {
      const embed = new EmbedBuilder()
        .setColor("#FF4D9C")
        .setDescription(
          `${interaction.user.username} has paid their respects for ${target.username} :pray: \n${global.todaysRips} Today, ${global.totalRips} All`
        );

      return interaction.reply({
        embeds: [embed],
      });
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setDescription(
        `${interaction.user.username} has paid their respects :pray:\n${global.todaysRips} Today, ${global.totalRips} All`
      );

    return interaction.reply({
      embeds: [embed],
    });
  },
};
