const mysql = require('mysql2');
let iniparser = require('iniparser');
const bodyparser = require('body-parser')

//connecton à la base
let configDB = iniparser.parseSync('./DB.ini')
let mysqlconnexion = mysql.createConnection({
    host: configDB['database']['host'],
    user: configDB['database']['user'],
    password: configDB['database']['password'],
    database: configDB['database']['database']
})


const Medecin = {
//fonction pour afficher les médecins
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

//fonction pour afficher UN médecin, lors de la modification
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


//fonction pour ajouter des médecins
    async ajouterMedecin(req) {

        let medNom = req.body.medNom //récupération des nom et prénom
        let medPrenom = req.body.medPrenom

        let requete = "INSERT INTO medecin (med_nom, med_prenom) VALUES ( ?, ?)" //requete sql pour ajouter

        return new Promise((reussi, echec) => {

            mysqlconnexion.query(requete, [medNom, medPrenom], (err, lignes, champs) => {//insertion

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    },

//fonction pour suprimer les médecins
    async supprimerMedecin(req) {
        const medId = req.params.id;//récupération de l'id du médecin à supprimer

        const requete = "DELETE FROM medecin WHERE med_Id = ?";

        return new Promise((reussi, echec) => {
            mysqlconnexion.query(requete, [medId], (err, lignes, champs) => { //suppression
                if (err) {
                    return echec(err);
                }
                return reussi(lignes);
            });
        });
    },

    //fonction pour modifier les médecins
    async modifierMedecin (medId, medNom, medPrenom) {

        return new Promise((reussi, echec) => {
            console.log(medId)
            const requete = "UPDATE medecin SET med_nom = ?, med_prenom = ? WHERE med_Id = ?"; //mise à jour du médecin avec les nouvelles infos
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