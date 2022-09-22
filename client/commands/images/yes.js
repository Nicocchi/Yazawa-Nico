const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yes")
    .setDescription("（＾∀＾）"),
  async execute(interaction) {
    const res = parseJSON("./JSON/yes.json");
    const target = interaction.options.getUser("user");
    let msg = `${interaction.user.username} says yes!`;

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `（＾∀＾）`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
