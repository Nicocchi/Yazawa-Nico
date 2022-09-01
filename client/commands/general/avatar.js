const { SlashCommandBuilder } = require("discord.js");

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
    if (user)
      return interaction.chanel.send(
        `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`
      );
    return interaction.channel.send(
      `Your avatar: ${interaction.user.displayAvatarURL()}`
    );
  },
};
