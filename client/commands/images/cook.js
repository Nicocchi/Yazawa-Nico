const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cook")
    .setDescription(
      "( ˘▽˘)っ♨"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to cook for")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/bite.json");
    const target = interaction.options.getUser("user");
    let msg = `Is cooking`;
    if (target) {
        if (target.id === client.id) {
            msg = "O-O you are giving me this!?"
        } else {
            msg = `${interaction.user.username} is cooking for ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `( ˘▽˘)っ♨`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
