const Discord = require("discord.js");
const { fetchMessages } = require('../DataBase/mess_lecture');

module.exports = {
    name: "show-message",
    description: "Show the last X messages sent by a User",
    permission: null, 
    dm: true, 
    options: [
        {
            type: Discord.ApplicationCommandOptionType.Integer,
            name: "number-of-messages",
            description: "Number of messages to retrieve",
            required: true
        },
        {
            type: Discord.ApplicationCommandOptionType.User,
            name: "user-name",
            description: "The username to retrieve messages for",
            required: true
        }
    ],
    async run(bot, interaction) {
        const number = interaction.options.getInteger('number-of-messages');
        const user = interaction.options.getUser('user-name');
        const username = user.username;
        const messages = await fetchMessages(username, number);
        
        if (!messages.length) {
            await interaction.reply({ content: "No messages found for this user.", ephemeral: true });
            return;
        }

        // Texte qui affiche X derniers messages de l'utilisateur recuperé dans la BD .
        let replyText = `Command show-message\nFrom User: ${username}\n`;
        messages.forEach((message, index) => {
            replyText += `Message  ${index + 1}  ${message.timestamp} : ${message.content}\n----------------\n`;
        });

        await interaction.reply({ content: replyText, ephemeral: false });
    }
};


