const { SlashCommandBuilder, hyperlink } = require("discord.js");

const link = "https://discord.gg/cs9Sv8N"

module.exports = {
  data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("Join the community server!"),
  async execute(interaction) {
    return interaction.reply(
      {
          content: hyperlink("Need help? Or want to join the community? Join our server!", link),
          ephemeral: true
      }
    );
  },
};
