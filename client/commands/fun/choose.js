const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const randomNumber = require("../../modules/functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("choose")
    .setDescription("Let Nico choose something for you!")
    .addStringOption((option) =>
      option
        .setName("options")
        .setDescription("List to choose from. Please separate via | symbol")
        .setRequired(true)
    ),

  async execute(interaction) {
    const options = interaction.options.getString("options").split(" | ");
    let i = randomNumber(0, options.length - 1);

    console.log(options);

    return interaction.reply({
      content: `I choose **${options[i]}**`,
    });
  },
};
