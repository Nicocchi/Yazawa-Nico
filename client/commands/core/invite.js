const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const link = `https://discord.com/api/oauth2/authorize?client_id=${process.env.APPLICATION_ID}&permissions=8&scope=applications.commands%20bot`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite the #1 idol in the universe!"),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("Invite (´｡• ᵕ •｡`) ♡")
        .setURL(link)
    );
    return interaction.reply({
      components: [row],
      ephemeral: true,
    });
  },
};
