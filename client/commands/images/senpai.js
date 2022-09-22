const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("senpai")
    .setDescription("Get senpai's attention")
    .addUserOption((option) =>
      option.setName("senpai").setDescription("The senpai to notice..")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/senpai.json");
    const target = interaction.options.getUser("senpai");
    let msg = `You are licking yourself`;
    if (target) {
      msg = `${interaction.user.username} is trying to get ${target.username} to notice them...\n\nPlease notice me senpai ಠ_ಠ`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `ಠ_ಠ`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
