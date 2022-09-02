const { SlashCommandBuilder, EmbedBuilder, hyperlink } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription(
      "Get the avatar URL of the selected user, or your own avatar."
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user's avatar to show")
    ),
  async execute(interaction) {
    const target = interaction.options.getUser("user");
    if (target) {
      const embed = new EmbedBuilder()
        .setColor("#FF4D9C")
        .setImage(target.displayAvatarURL({ size: 4096, dynamic: true }))
        .setAuthor({
          name: `${target.username}'s avatar`,
          url: target.displayAvatarURL({ size: 4096, dynamic: true }),
        });

      return interaction.reply({
        embeds: [embed],
      });
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(interaction.user.displayAvatarURL({ size: 4096, dynamic: true }))
      .setAuthor({
        name: `${interaction.user.username}'s avatar`,
        url: interaction.user.displayAvatarURL({ size: 4096, dynamic: true }),
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
