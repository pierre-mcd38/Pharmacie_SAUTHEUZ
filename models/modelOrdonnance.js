const mysql = require('mysql2');
let iniparser = require('iniparser');
const bodyparser = require('body-parser');

let configDB = iniparser.parseSync('./DB.ini');
let mysqlconnexion = mysql.createConnection({
    host: configDB['database']['host'],
    user: configDB['database']['user'],
    password: configDB['database']['password'],
    database: configDB['database']['database']
});

const ordonnance = {

    async afficherOrdonnance() {

        return new Promise((reussi, echec) => {

            mysqlconnexion.query("SELECT * FROM ordonnance", (err, lignes, champs) => {

                if (err) {

                    return echec(err);

                }

                return reussi(lignes);

            });
        });
    },
    
};

module.exports = {
    ordonnance
};
