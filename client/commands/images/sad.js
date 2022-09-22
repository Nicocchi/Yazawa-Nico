const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sad")
    .setDescription("ಠ__ಠ")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to be sad from")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/sad.json");
    const target = interaction.options.getUser("user");
    let msg = `You are sad`;
    if (target) {
      msg = `${interaction.user.username} is sad because of ${target.username}`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `ಠ__ಠ`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
