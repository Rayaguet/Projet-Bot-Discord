const mysql = require('mysql');
const connectdb = require('./connectdb');

module.exports = (bot) => {
    console.log("Module d'insertion des messages chargé et prêt.");

    bot.on('messageCreate', async message => {
        if (!message.author.bot) {
            const db = await connectdb();
            let userId;

            // Vérifie si l'utilisateur existe déjà.
            const userCheck = 'SELECT user_id FROM users WHERE pseudo = ?';
            db.query(userCheck, [message.author.username], (err, results) => {
                if (err) throw err;
                if (results.length === 0) {
                    // Insére l'utilisateur s'il n'existe pas.
                    const insertUser = 'INSERT INTO users (pseudo) VALUES (?)';
                    db.query(insertUser, [message.author.username], (err, result) => {
                        if (err) throw err;
                        userId = result.insertId;
                        insertMessage(userId, message.content, message.channel.id, db);
                    });
                } else {
                    userId = results[0].user_id;
                    insertMessage(userId, message.content,message.channel.id, db);
                }
            });
        }
    });

    function insertMessage(userId, content, channelId, db) {
        const insertMsg = 'INSERT INTO message (mess_ecrit, user_id, channel_id, horaire) VALUES (?, ?, ?, NOW())';
        db.query(insertMsg, [content, userId, channelId], err => {
            if (err) throw err;
            console.log('Message inséré dans la BD vega_bot ! ');
        });
    }
};
