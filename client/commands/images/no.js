const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("no")
    .setDescription("(＃＞＜)")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user no to")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/no.json");
    const target = interaction.options.getUser("user");
    let msg = `You are saying no`;
    if (target) {
      msg = `${interaction.user.username} is saying no to ${target.username}`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(＃＞＜)`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
