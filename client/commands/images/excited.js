const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("excited")
    .setDescription(
      "(ᗒᗨᗕ)"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to be excited from")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/excited.json");
    const target = interaction.options.getUser("user");
    let msg = `You are excited!`;
    if (target) {
        if (target.id === client.id) {
            msg = "Waku waku!"
        } else {
            msg = `${interaction.user.username} is excited from ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(ᗒᗨᗕ)`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
