const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cuddle")
    .setDescription(
      "(⁄ ⁄•⁄ω⁄•⁄ ⁄)"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to cuddle")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/cuddle.json");
    const target = interaction.options.getUser("user");
    let msg = `You are cuddling yourself`;
    if (target) {
        if (target.id === client.id) {
            msg = "Oi! Sawaranaide!"
        } else {
            msg = `Awwe, ${interaction.user.username} is cuddling ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(⁄ ⁄•⁄ω⁄•⁄ ⁄)`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
