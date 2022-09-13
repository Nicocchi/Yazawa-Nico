const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("congrats")
    .setDescription(
      "ヽ(＾Д＾)ﾉ"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to congratulate")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/blush.json");
    const target = interaction.options.getUser("user");
    let msg = `:clap:`;
    if (target) {
        if (target.id === client.id) {
            msg = "Aww, let Nico give you a Nico Nii~"
        } else {
            msg = `Awwe, ${interaction.user.username} is congratulating ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `ヽ(＾Д＾)ﾉ`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
