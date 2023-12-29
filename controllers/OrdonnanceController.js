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

    
};
module.exports = {
    controlOrd
}