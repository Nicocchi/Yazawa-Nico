const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const link = "https://discord.gg/cs9Sv8N";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("Join the community server!"),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("Join ♡＼(￣▽￣)／♡")
        .setURL(link)
    );
    return interaction.reply({
      components: [row],
      ephemeral: true,
    });
  },
};
