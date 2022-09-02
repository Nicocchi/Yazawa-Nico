const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("give")
    .setDescription("Give an item to someone")
    .addStringOption((option) =>
      option.setName("item").setDescription("Item to give").setRequired(true)
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("User to receive the item")
    ),
    
  async execute(interaction) {
    const target = interaction.options.getUser("user");
    const item = interaction.options.getString("item");
    if (target) {
      const embed = new EmbedBuilder().setColor("#FF4D9C").addFields({
        name: "(≧▽≦)",
        value: `${target.username} you got a ${item} from ${interaction.user.username}~ \n\n(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ${item}`,
      });

      return interaction.reply({
        embeds: [embed],
      });
    }

    const embed = new EmbedBuilder().setColor("#FF4D9C").addFields({
      name: "(≧▽≦)",
      value: `Aww, you seemed to really want this so here~ \n\n(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ${item}`,
    });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
