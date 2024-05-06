const Discord = require("discord.js");

module.exports = {
    name: "who-am-i",
    description: "Affiche des informations sur l'utilisateur exécutant la commande",
    permission: "Aucune",
    dm: true,
    async run(bot, interaction) {
        const user = interaction.user;
        const guild = interaction.guild;

        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

        const responseMessage = `
            you are : ${user.username}
            you id is : ${user.id}
            this server id is : ${guild.id}
            you avatar id is : ${user.avatar}
            Your avatar: ${avatarURL}
        `;

        await interaction.reply(responseMessage);
    }
};
