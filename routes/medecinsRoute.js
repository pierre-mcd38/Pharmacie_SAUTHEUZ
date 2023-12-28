const express = require('express');
const routeur = express.Router();
const ctrlMedecin = require('../controllers/medecinsController.js');


routeur.get('/medecins/afficher', ctrlMedecin.controlMed.afficherMedecin)
routeur.post('/medecins/ajouter', ctrlMedecin.controlMed.ajouterMedecin)
routeur.post('/medecins/supprimer/:id', ctrlMedecin.controlMed.supprimerMedecin);
routeur.get('/medecins/modifier/:id', ctrlMedecin.controlMed.afficherUnMedecin);
routeur.post('/medecins/modifier', ctrlMedecin.controlMed.modifierMedecin);


module.exports = routeur;
