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
    
    async ajouterOrdonnance(req) {

        let ordo_medId = req.body.ordo_medId
        let ordo_cliId = req.body.ordo_cliId
        let ordo_pathId = req.body.ordo_pathId
        let ordo_date = req.body.ordo_date

        let requete = "INSERT INTO ordonnance (ordo_medId, ordo_cliId, ordo_pathId, ordo_date) VALUES ( ?, ?, ?, ?)"

        return new Promise((reussi, echec) => {

            mysqlconnexion.query(requete, [ordo_medId, ordo_cliId, ordo_pathId, ordo_date], (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    },

    

};

module.exports = {
    ordonnance
};
