const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wink")
    .setDescription("(๑˃ᴗ˂)ﻭ")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to wink at")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/wink.json");
    const target = interaction.options.getUser("user");
    let msg = `You are winking`;
    if (target) {
      msg = `${interaction.user.username} is winking at ${target.username}`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(๑˃ᴗ˂)ﻭ`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
