const { SlashCommandBuilder, ApplicationCommandOptionType } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9"); 

module.exports = async bot => {
    let commands = [];

    bot.commands.forEach(command => {
        let slashcommand = new SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description)
            .setDMPermission(command.dm)
            .setDefaultMemberPermissions(command.permission === "Aucune" ? null : command.permission);

        if (command.options?.length) {
            for (let option of command.options) {
                
                let method = `add${ApplicationCommandOptionType[option.type]}Option`;
                if (slashcommand[method]) {
                    slashcommand[method](opt => opt
                        .setName(option.name)
                        .setDescription(option.description)
                        .setRequired(option.required)
                    );
                }
            }
        }

        commands.push(slashcommand.toJSON()); 
    });

    const rest = new REST({ version: "9" }).setToken(bot.token);

    try {
        await rest.put(
            Routes.applicationCommands(bot.user.id),
            { body: commands }
        );
        console.log("Les commandes slash sont créées avec succès !");
    } catch (error) {
        console.error("Erreur lors de la création des commandes slash :", error);
    }
};





