const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tantrum")
    .setDescription("(╯°□°)╯︵ ┻━┻ ")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to have a tantrum from")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/tantrum.json");
    const target = interaction.options.getUser("user");
    let msg = `You are throwing a tantrum`;
    if (target) {
      msg = `${interaction.user.username} is having a tantrum from ${target.username}`;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(╯°□°)╯︵ ┻━┻ `,
        value: msg,
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
