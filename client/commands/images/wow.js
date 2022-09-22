const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wow")
    .setDescription("w(°ｏ°)w")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to be wowed from")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/wow.json");
    const target = interaction.options.getUser("user");
    let msg = `You are wowed`;
    if (target) {
      msg = `${interaction.user.username} is w(°ｏ°)w because of ${target.username}`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `w(°ｏ°)w`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
