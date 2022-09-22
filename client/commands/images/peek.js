const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("peek")
    .setDescription("(o-_-o)")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to have a peek at")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/peek.json");
    const target = interaction.options.getUser("user");
    let msg = `You are peeking`;
    if (target) {
      msg = `${interaction.user.username} is peeking at ${target.username}`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(o-_-o)`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
