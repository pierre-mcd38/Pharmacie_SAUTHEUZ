const modelOrd = require('../models/modelOrdonnance');

const controlOrd = {

    async afficherOrdonnance(req, res) {

        try {

            const data = await modelOrd.ordonnance.afficherOrdonnance();

            if (data) {
                res.render('ordonnance', { ordonnance: data });

            } else {
                res.render('ordonnance/afficher', { ordonnance: {} });
            }
        } catch (error) {
            console.log(error);
        }
    },

    async ajouterOrdonnance(req, res) {
        try {
            const data = await modelOrd.ordonnance.ajouterOrdonnance(req);
    
            if (data) {
                res.redirect("ordonnance");
            } else {
                console.log("problème lors de l'ajout du médecin");
                res.redirect("/odrnnance/afficher");
            }
        } catch (error) {
            console.log(error);
            res.redirect("/ordonnance/afficher");
        }
    },
    

};
module.exports = {
    controlOrd
}