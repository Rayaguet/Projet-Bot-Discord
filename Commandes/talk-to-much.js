const Discord = require("discord.js");
const { fetchMostActiveUser } = require('../DataBase/mess_lecture');

module.exports = {
    name: "talk-to-much",
    description: "Give the username of the most active user in a specific channel",
    permission: null,
    dm: false,
    options: [
        {
            type: Discord.ApplicationCommandOptionType.Channel,
            name: "channel-id",
            description: "The channel to analyze",
            required: true
        }
    ],
    async run(bot, interaction) {
        const channel = interaction.options.getChannel('channel-id');

        if (!channel) {
            return interaction.reply({ content: "Please provide a valid text channel.", ephemeral: true });
        }

        const result = await fetchMostActiveUser(channel.id);

        if (!result) {
            await interaction.reply({ content: "No messages found in this channel.", ephemeral: true });
            return;
        }

        await interaction.reply({ content: `The most active user in channel ${channel.name} is ${result.username} with ${result.message_count} message(s).`, ephemeral: false });
    }
};
