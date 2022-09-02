const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cucumber")
    .setDescription("Give a cucumber to someone")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to receive the cucumber")
    ),
    
  async execute(interaction) {
    const target = interaction.options.getUser("user");
    const item = interaction.options.getString("item");
    if (target) {
      const embed = new EmbedBuilder().setColor("#FF4D9C").addFields({
        name: "(≧▽≦)",
        value: `${target.username} you got a :cucumber: from ${interaction.user.username}~ \n\n(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ${item}`,
      });

      return interaction.reply({
        embeds: [embed],
      });
    }

    const embed = new EmbedBuilder().setColor("#FF4D9C").addFields({
      name: "(≧▽≦)",
      value: `You throw a :cucumber: into the chat- \n\n(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ :cucumber:`,
    });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
