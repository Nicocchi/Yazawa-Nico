const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nom")
    .setDescription(
      "(っ˘ڡ˘ς)"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to nom")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/nom.json");
    const target = interaction.options.getUser("user");
    let msg = `You are licking yourself`;
    if (target) {
        if (target.id === client.id) {
            msg = "-_-"
        } else {
            msg = `${interaction.user.username} is noming ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `(っ˘ڡ˘ς)`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
