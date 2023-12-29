const express = require('express');
const routeur = express.Router();
const ctrlOrdonnance = require('../controllers/OrdonnanceController.js');


routeur.get('/ordonnance/afficher',ctrlOrdonnance.controlOrd.afficherOrdonnance);
routeur.post('/ordonnance/ajouter', ctrlOrdonnance.controlOrd.ajouterOrdonnance);
/*
routeur.post('/medecins/supprimer/:id', ctrlMedecin.controlMed.supprimerMedecin);
routeur.get('/medecins/modifier/:id', ctrlMedecin.controlMed.afficherUnMedecin);
routeur.post('/medecins/modifier', ctrlMedecin.controlMed.modifierMedecin);
*/

module.exports = routeur;
