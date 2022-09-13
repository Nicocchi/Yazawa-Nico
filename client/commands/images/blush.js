const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blush")
    .setDescription(
      "(⁄ ⁄•⁄ω⁄•⁄ ⁄)"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to blush from")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/blush.json");
    const target = interaction.options.getUser("user");
    let msg = `You are blushing`;
    if (target) {
        if (target.id === client.id) {
            msg = "Aw-awe (⁄ ⁄•⁄ω⁄•⁄ ⁄)"
        } else {
            msg = `${interaction.user.username} is blushing from ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(⁄ ⁄•⁄ω⁄•⁄ ⁄)`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
