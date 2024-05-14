const connectdb = require('./connectdb');

// Fonction pour formater les timestamps.
function formatTimestamp(horaire) {
    return new Date(horaire).toLocaleString("fr-FR"); 
}

async function fetchMessages(username, limit) {
    const db = await connectdb();

    try {
        const query = `
        SELECT * FROM (
            SELECT mess_ecrit, horaire
            FROM message
            JOIN users ON users.user_id = message.user_id
            WHERE users.pseudo = ?
            ORDER BY horaire DESC
            LIMIT ?
        ) AS subquery
        ORDER BY horaire ASC;
        `;

        return new Promise((resolve, reject) => {
            db.query(query, [username, limit], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.map(row => ({
                        content: row.mess_ecrit,
                        timestamp: formatTimestamp(row.horaire)
                    })));
                }
            });
        });
    } finally {
        db.end();
    }
}

async function fetchChannelMessages(channelId, limit) {
    const db = await connectdb();

    try {
        const query = `
        SELECT * FROM (
            SELECT mess_ecrit, horaire
            FROM message
            WHERE channel_id = ?
            ORDER BY horaire DESC
            LIMIT ?
        ) AS subquery
        ORDER BY horaire ASC;
        `;

        return new Promise((resolve, reject) => {
            db.query(query, [channelId, limit], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.map(row => ({
                        content: row.mess_ecrit,
                        timestamp: formatTimestamp(row.horaire)
                    })));
                }
            });
        });
    } finally {
        db.end();
    }
}
async function fetchMostActiveUser(channelId) {
    const db = await connectdb();
    try {
        const query = `
            SELECT users.pseudo, COUNT(*) AS message_count
            FROM message
            JOIN users ON users.user_id = message.user_id
            WHERE message.channel_id = ?
            GROUP BY users.user_id
            ORDER BY message_count DESC
            LIMIT 1;
        `;

        return new Promise((resolve, reject) => {
            db.query(query, [channelId], (error, results) => {
                if (error) {
                    reject(error);
                } else if (results.length > 0) {
                    resolve({
                        username: results[0].pseudo,
                        message_count: results[0].message_count
                    });
                } else {
                    resolve(null);
                }
            });
        });
    } finally {
        db.end();
    }
}

module.exports = { fetchMessages, fetchChannelMessages, fetchMostActiveUser  };



