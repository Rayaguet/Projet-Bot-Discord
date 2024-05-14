const mysql = require('mysql');

function connectdb() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'vega_bot'
    });

    connection.connect(err => {
        if (err) {
            console.error('Erreur de connexion à la base de données:', err);
            return;
        }
        console.log('Connecté à la base de données MySQL');
    });

    return connection;
}
//Permet l'exportation de la fonction qui connecte à la BD.
module.exports = connectdb; 
