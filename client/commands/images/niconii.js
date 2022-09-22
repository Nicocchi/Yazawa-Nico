const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hug")
    .setDescription(
      "<:niconi:506940178204721162>"
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/hug.json");
    let msg = `Nico Nico Nii ~ Anata no heart ni Nico Nico Nii ~ Egao todokeru Yazawa Nico~ Nico Nii te oboeteru Love Nico~`;
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `<:niconi:506940178204721162>`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
