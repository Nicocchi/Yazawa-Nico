const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poke")
    .setDescription("(*/。＼)")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to poke")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/poke.json");
    const target = interaction.options.getUser("user");
    let msg = `You are poking thin air...`;
    if (target) {
      msg = `${interaction.user.username} is poking ${target.username}`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(*/。＼)`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
