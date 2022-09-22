const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lick")
    .setDescription(
      "\\\\(★ω★)/"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to lick")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/lick.json");
    const target = interaction.options.getUser("user");
    let msg = `You are licking yourself`;
    if (target) {
        if (target.id === client.id) {
            msg = "OOOOOIIIII!!! Hentai!!!"
        } else {
            msg = `${interaction.user.username} is licking ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `\\\\(★ω★)/`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
