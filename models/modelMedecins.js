const mysql = require('mysql2');
let iniparser = require('iniparser');
const bodyparser = require('body-parser')

let configDB = iniparser.parseSync('./DB.ini')
let mysqlconnexion = mysql.createConnection({
    host: configDB['database']['host'],
    user: configDB['database']['user'],
    password: configDB['database']['password'],
    database: configDB['database']['database']
})


const Medecin = {

    async afficherMedecin() {

        return new Promise((reussi, echec) => {

            mysqlconnexion.query("SELECT * FROM medecin", (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    },


    async afficherUnMedecin(medId) {
        return new Promise((reussi, echec) => {
            const requete = "SELECT * FROM medecin WHERE med_id = ?";

            mysqlconnexion.query(requete, [medId], (err, lignes, champs) => {
                if (err) {
                    return echec(err);
                }
                return reussi(lignes[0]);
            });
        }); 
    },



    async ajouterMedecin(req) {

        let medNom = req.body.medNom
        let medPrenom = req.body.medPrenom

        let requete = "INSERT INTO medecin (med_nom, med_prenom) VALUES ( ?, ?)"

        return new Promise((reussi, echec) => {

            mysqlconnexion.query(requete, [medNom, medPrenom], (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    },


    async supprimerMedecin(req) {
        const medId = req.params.id;

        const requete = "DELETE FROM medecin WHERE med_Id = ?";

        return new Promise((reussi, echec) => {
            mysqlconnexion.query(requete, [medId], (err, lignes, champs) => {
                if (err) {
                    return echec(err);
                }
                return reussi(lignes);
            });
        });
    },

    async modifierMedecin (medId, medNom, medPrenom) {

        return new Promise((reussi, echec) => {
            console.log(medId)
            const requete = "UPDATE medecin SET med_nom = ?, med_prenom = ? WHERE med_Id = ?";
            mysqlconnexion.query(requete, [medNom, medPrenom, medId], (err, lignes, champs) => {
                if (err) {
                    return echec(err);
                }
                return reussi(lignes);
            });
        });
    }


}

module.exports = {
    Medecin
}