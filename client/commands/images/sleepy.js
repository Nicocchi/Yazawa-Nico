const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sleepy")
    .setDescription("￣o￣) zzZZzzZZ")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to be tired from")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/sleepy.json");
    const target = interaction.options.getUser("user");
    let msg = `You are tired`;
    if (target) {
      msg = `${interaction.user.username} is tired because of ${target.username}`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `￣o￣) zzZZzzZZ`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
