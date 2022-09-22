const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("protect")
    .setDescription("⋋_⋌")
    .addUserOption((option) =>
      option.setName("usertoprotect").setDescription("The user to protect")
    )
    .addUserOption((option) =>
      option
        .setName("usertoprotectfrom")
        .setDescription("The user to protect from")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/pat.json");
    const target = interaction.options.getUser("usertoprotect");
    const target2 = interaction.options.getUser("usertoprotectfrom");
    let msg = `You are protecting yourself`;
    if (target & !target2) {
      msg = `${interaction.user.username} is protecting ${target.username}`;
    } else if (target & target2) {
      msg = `${interaction.user.username} is protecting ${target.username} from ${target2.username}`;
    } else if (!target & target2) {
      msg = `${interaction.user.username} is protecting themselves from ${target2.username}`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `⋋_⋌`,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
