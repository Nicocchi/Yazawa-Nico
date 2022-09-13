const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bite")
    .setDescription(
      "；￣Д￣)"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to bite")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/bite.json");
    const target = interaction.options.getUser("user");
    let msg = `You are biting thin air!`;
    if (target) {
        if (target.id === client.id) {
            msg = "Baka baka- you think you can bite me?"
        } else {
            msg = `${interaction.user.username} bites ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `；￣Д￣)`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
