const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Echo's your input")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to echo")
        .setRequired(true)
    ),

  async execute(interaction) {
    return interaction.channel.send({
        content: interaction.options.getString("message")
    });
  },
};
