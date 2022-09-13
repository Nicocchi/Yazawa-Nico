const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("attack")
    .setDescription(
      "⋋_⋌"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to be attacked")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/attack.json");
    const target = interaction.options.getUser("user");
    let msg = `You are attacking air OwO`;
    if (target) {
        if (target.id === client.id) {
            msg = "You dare attack an idol!?"
        } else {
            msg = `${interaction.user.username} is attacking ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `⋋_⋌`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
