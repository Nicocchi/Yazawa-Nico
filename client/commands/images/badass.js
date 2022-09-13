const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("badass")
    .setDescription(
      "ლಠ益ಠ)ლ"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user that is being a badass")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/badass.json");
    const target = interaction.options.getUser("user");
    let msg = `You are being a badass!`;
    if (target) {
        if (target.id === client.id) {
            msg = "Hmph"
        } else {
            msg = `${interaction.user.username} thinks ${target.username} is a badass`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `ლಠ益ಠ)ლ`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
