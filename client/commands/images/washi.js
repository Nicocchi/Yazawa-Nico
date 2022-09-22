const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("washi")
    .setDescription("(つ✧ω✧)つ")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to washi")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/washi.json");
    const target = interaction.options.getUser("user");
    let msg = `You are washing nothing... lol`;
    if (target) {
      msg = `${interaction.user.username} is washi-ing ${target.username}!!`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(つ✧ω✧)つ`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
