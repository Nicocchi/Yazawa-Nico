const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dance")
    .setDescription(
      "٩(θ‿θ)۶"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to dance with")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/dance.json");
    const target = interaction.options.getUser("user");
    let msg = `You are dancing`;
    if (target) {
        if (target.id === client.id) {
            msg = "Saa! Let's dance!!"
        } else {
            msg = `Awwe, ${interaction.user.username} is dancing ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `٩(θ‿θ)۶`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
