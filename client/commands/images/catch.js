const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("catch")
    .setDescription(
      "☆ﾐ(o*･ω･)ﾉ"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to catch")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/catch.json");
    const target = interaction.options.getUser("user");
    let msg = `You are catching thin air`;
    if (target) {
        if (target.id === client.id) {
            msg = "Oi! I'm gonna catch you hehehe"
        } else {
            msg = `${interaction.user.username} is trying to catch ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `☆ﾐ(o*･ω･)ﾉ`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
