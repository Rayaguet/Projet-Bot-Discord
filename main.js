const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({ intents });
const loadCommands = require("./Loaders/loadCommands");
const loadEvents = require("./Loaders/loadEvents");
const config = require("./config");
const mess_insert = require("./DataBase/mess_insert");

bot.commands = new Discord.Collection();

bot.login(config.token).then(() => {
    loadCommands(bot);
    loadEvents(bot);
    mess_insert(bot);
    console.log("Fonction permettant l'insertion des messages en base fonctionnelle.");
}).catch(err => {
    console.error('Failed to login or initialize the bot:', err);
});





