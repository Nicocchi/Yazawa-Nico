const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const client = require("../../index.js");
const { parseJSON } = require("../../modules/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("highfive")
    .setDescription(
      "ヽ(＾Д＾)ﾉヽ(＾Д＾)ﾉ"
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to highfive")
    ),
  async execute(interaction) {
    const res = parseJSON("./JSON/highfive.json");
    const target = interaction.options.getUser("user");
    let msg = `You are highfiving yourself`;
    if (target) {
        if (target.id === client.id) {
            msg = "Yay! ヽ(＾Д＾)ﾉヽ(＾Д＾)ﾉ"
        } else {
            msg = `${interaction.user.username} is highfiving ${target.username}`
        }
      
    }
    
    const embed = new EmbedBuilder()
      .setColor("#FF4D9C")
      .setImage(res ? res : "https://tenor.com/view/manhunt-gif-24839966")
      .addFields({
        name: `ヽ(＾Д＾)ﾉヽ(＾Д＾)ﾉ`,
        value: msg
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
