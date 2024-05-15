const connectdb = require('./connectdb');

// Cette fonction supprime un nombre spécifié de messages les plus récents dans un canal donné
async function deleteMessagesFromDB(channelId, messageIds) {
    const db = await connectdb();
    try {
        const query = `
            DELETE m
            FROM message AS m
            JOIN (
                SELECT message_id
                FROM message
                WHERE channel_id = ?
                ORDER BY horaire DESC
                LIMIT ?
            ) AS temp ON m.message_id = temp.message_id;
        `;
        return new Promise((resolve, reject) => {
            db.query(query, [channelId, parseInt(messageIds)], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.affectedRows);  // Retourne le nombre de lignes affectées
                }
            });
        });
    } finally {
        db.end();  // Assure-toi de fermer la connexion après l'opération
    }
}

module.exports = { deleteMessagesFromDB };

