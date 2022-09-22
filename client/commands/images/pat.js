const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pat")
    .setDescription("(ｏ・_・)ノ”(ノ_<、)")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to pat")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/pat.json");
    const target = interaction.options.getUser("user");
    let msg = `You are patting yourself`;
    if (target) {
      msg = `${interaction.user.username} is patting ${target.username}`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(ｏ・_・)ノ”(ノ_<、)`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
