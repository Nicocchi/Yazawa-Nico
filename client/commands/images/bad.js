const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bad")
    .setDescription(
      "＼('0')/／"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user that is being bad")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/bad.json");
    const target = interaction.options.getUser("user");
    let msg = `You are being bad!`;
    if (target) {
        if (target.id === client.id) {
            msg = "Hmph, I'm never bad baka >-<"
        } else {
            msg = `${interaction.user.username} is punishing ${target.username} because they have been bad!`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `＼('0')/／`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
