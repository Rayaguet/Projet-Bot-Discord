const Discord = require("discord.js");
const { deleteMessagesFromDB } = require('../DataBase/mess_delete'); // Assurez-vous d'avoir cette fonction pour interagir avec la BD

module.exports = {
    name: "clean-channel",
    description: "Clean the specified number of messages from a channel",
    permission: null, 
    dm: false, 
    options: [
        {
            type: Discord.ApplicationCommandOptionType.Integer,
            name: "number-of-messages",
            description: "Number of messages to clean",
            required: true
        },
        {
            type: Discord.ApplicationCommandOptionType.Channel,
            name: "channel-id",
            description: "The channel to clean messages from",
            required: true
        }
    ],
    async run(bot, interaction) {
        const number = interaction.options.getInteger('number-of-messages');
        const channel = interaction.options.getChannel('channel-id');

        if (!channel) {
            return interaction.reply({ content: "Please provide a valid text channel.", ephemeral: true });
        }

        try {
            const fetchedMessages = await channel.messages.fetch({ limit: number });
            const messageIds = fetchedMessages.map(msg => msg.id);
            await channel.bulkDelete(fetchedMessages, true);

            // Optionally delete from database
            await deleteMessagesFromDB(channel.id, messageIds); // Cette fonction doit être définie pour gérer la suppression dans la BD

            interaction.reply({ content: `Successfully cleaned ${fetchedMessages.size} messages from the channel.`, ephemeral: false });
        } catch (error) {
            console.error('Failed to clean messages:', error);
            interaction.reply({ content: "Failed to clean messages due to an error.", ephemeral: true });
        }
    }
};

