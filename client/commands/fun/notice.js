const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("notice")
    .setDescription("Notice someone O-O")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to notice")
    ),
  async execute(interaction) {

    const target = interaction.options.getUser("user");
    if (target) {
      const embed = new EmbedBuilder()
        .setColor("#FF4D9C")
        .addFields({
            name: "(≧▽≦)",
            value: `${interaction.user.username} has notice ${target.username}`
        })

      return interaction.reply({
        embeds: [embed],
      });
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .addFields({
        name: "(≧▽≦)",
        value: `${interaction.user.username} has notices the empty chat`
    })

    return interaction.reply({
      embeds: [embed],
    });
  },
};
