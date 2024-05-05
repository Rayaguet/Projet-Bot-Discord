const Discord = require("discord.js");

module.exports = {
    name: "hey",
    description: "Répond 'Hey!'",
    permission: "Aucune",
    dm: true,
    async run(bot, message) {
        await message.reply("Hey!");
    }
};


