const Discord = require("discord.js");
const { fetchChannelMessages } = require('../DataBase/mess_lecture'); 

module.exports = {
    name: "show-message-channel",
    description: "Show the last X messages sent in a specified channel",
    permission: null, 
    dm: false, 
    options: [
        {
            type: Discord.ApplicationCommandOptionType.Integer,
            name: "number-of-messages",
            description: "Number of messages to retrieve",
            required: true
        },
        {
            type: Discord.ApplicationCommandOptionType.Channel,
            name: "channel-id",
            description: "The channel to retrieve messages from",
            required: true
        }
    ],
    async run(bot, interaction) {
        const number = interaction.options.getInteger('number-of-messages');
        const channel = interaction.options.getChannel('channel-id');
        
        //console.log(channel.type)
        if (!channel ) {
            return interaction.reply({ content: "Please provide a valid text channel.", ephemeral: true });
        }

        const messages = await fetchChannelMessages(channel.id, number);
        
        if (!messages.length) {
            await interaction.reply({ content: "No messages found in this channel.", ephemeral: true });
            return;
        }

        let replyText = `Last ${number} messages from channel ${channel.name}:\n`;
        messages.forEach((message, index) => {
            replyText += `Message ${index + 1}: [${message.timestamp}] ${message.content}\n----------------\n`;
        });

        await interaction.reply({ content: replyText, ephemeral: false }); 
    }
};
