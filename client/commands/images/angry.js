const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("angry")
    .setDescription(
      "((╬◣﹏◢))"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to be angry at")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/angry.json");
    const target = interaction.options.getUser("user");
    let msg = `${interaction.user.username} is angry!`;
    if (target) {
        if (target.id === client.user.id) {
            msg = "OI! BAKA JA NE NO!?"
        } else {
            msg = `${interaction.user.username} is angry at ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `((╬◣﹏◢))`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
