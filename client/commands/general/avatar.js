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
    const user = interaction.options.getUser("user");
    if (user) {
      const embed = new EmbedBuilder()
        .setColor("#FF4D9C")
        .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
        .setAuthor({
          name: `${user.username}'s avatar`,
          url: user.displayAvatarURL({ size: 4096, dynamic: true }),
        });

      return interaction.reply({
        embeds: [embed],
      });
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
      .setAuthor({
        name: `${user.username}'s avatar`,
        url: user.displayAvatarURL({ size: 4096, dynamic: true }),
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
