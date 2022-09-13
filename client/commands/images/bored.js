const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bored")
    .setDescription(
      "(￣︿￣)"
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/bored.json");
    let msg = `${interaction.user.username} is bored...`;
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(￣︿￣)`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
