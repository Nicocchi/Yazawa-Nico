const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wasted")
    .setDescription("T_T"),
  async execute(interaction) {
    const res = parseJSON("./JSON/wasted.json");
    const target = interaction.options.getUser("user");
    let msg = `You are wasted`;

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `T_T`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
