const Discord = require("discord.js");
const connectdb = require("../DataBase/connectdb");
const loadSlashCommands = require("../Loaders/loadSlashCommands");

module.exports = async bot => {
    try {
        //connectdb() retourne une instance de connexion ok!
        const db = await connectdb();

        // Log de confirmation de la BD bien connectée!
        console.log("La base de données est bien connectée !");

        // Chargement des commandes slash
        await loadSlashCommands(bot);

        // Confirmation que le bot est en ligne!
        console.log(`${bot.user.tag} est bien en ligne !`);

        // Gestion correcte de la fermeture de la connexion!
        db.end(() => {
            console.log("Connexion à la base de données fermée.");
        });

    } catch (error) {
        console.error("Erreur lors de la connexion à la base de données ou du chargement des commandes:", error);
    }
};
