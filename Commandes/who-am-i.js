const Discord = require("discord.js");

module.exports = {
    name: "who-am-i",
    description: "Affiche des informations sur l'utilisateur exécutant la commande",
    permission: "Aucune",
    dm: true,
    async run(bot, interaction) {
        const user = interaction.user;
        const guild = interaction.guild;

        const responseMessage = `
            you are : ${user.username}
            you id is : ${user.id}
            you avatar is : ${user.avatar}
            this server id is : ${guild.id}
        `;

        await interaction.reply(responseMessage);
    }
};
