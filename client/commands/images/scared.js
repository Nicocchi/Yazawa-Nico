const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("scared")
    .setDescription("〣( ºΔº )〣")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to be scared from")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/scared.json");
    const target = interaction.options.getUser("user");
    let msg = `You are scared >~<`;
    if (target) {
      msg = `${interaction.user.username} is scared of ${target.username}`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `〣( ºΔº )〣`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
