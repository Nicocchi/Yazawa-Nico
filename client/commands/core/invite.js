const { SlashCommandBuilder, hyperlink } = require("discord.js");

const link = "https://discord.com/api/oauth2/authorize?client_id=506978703721627648&permissions=8&scope=applications.commands%20bot"

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite the #1 idol in the universe!"),
  async execute(interaction) {
    return interaction.channel.send(
      {
          content: hyperlink("Invite the worlds #1 idol!", link),
          ephemeral: true
      }
    );
  },
};
