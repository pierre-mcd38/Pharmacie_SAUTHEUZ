const modelMed = require('../models/modelMedecins');

const controlMed = {

    async afficherMedecin(req, res) {

        try {

            const data = await modelMed.Medecin.afficherMedecin()

            if (data) {
                res.render('medecins', { medecin: data })

            } else {
                res.render('medecins/afficher', { medecin: {} })
            }
        } catch (error) {
            console.log(error)
        }
    },

    async afficherUnMedecin(req, res) {
        try {
            const medId = req.params.id;
            const medecin = await modelMed.Medecin.afficherUnMedecin(medId);
            console.log(medecin)
            res.render('modifierMedecin', { medecin });
        } catch (error) {
            console.log(error);
            res.redirect('/medecins/afficher');
        }
    },




    async ajouterMedecin(req, res) {

        try {

            const data = await modelMed.Medecin.ajouterMedecin(req)

            if (data) {
                res.redirect("/medecins")

            } else {
                console.log("probleme")
                res.render("medecins/afficher")
            }
        } catch (error) {
            console.log(error)
        }
    },

    async supprimerMedecin(req, res) {
        try {

            const data = await modelMed.Medecin.supprimerMedecin(req)

            if (data) {

                res.redirect("/medecins");

            } else {

                console.log("probleme");
                res.redirect("medecins");
            }
        } catch (error) {
            console.log(error)
        }
    },

    async modifierMedecin(req, res) {
        try {
            const medId = req.body.medId;
            const medNom = req.body.medNom;
            const medPrenom = req.body.medPrenom;
            console.log(medId, medNom, medPrenom)
            const data = await modelMed.Medecin.modifierMedecin(medId, medNom, medPrenom);

            if (data) {
                res.redirect("/medecins");
            } else {
                console.log("probleme");
                res.redirect("/medecins/afficher");
            }
        } catch (error) {
            console.log(error);
        }
        console.log('ctrl')
    },





}
module.exports = {
    controlMed
}