const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cry")
    .setDescription("(༎ຶ⌑༎ຶ)")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user that made you cry")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/cry.json");
    const target = interaction.options.getUser("user");
    let msg = `You cried... Aww, let Nico give you a special Nico Nii~`;
    if (target) {
      msg = `${interaction.user.username} is crying because of ${target.username}... Have a Nico Nii to cheer you up~ Nico Nico Nii~`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(༎ຶ⌑༎ຶ)`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
