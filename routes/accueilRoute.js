const express = require('express');
const router = express.Router();

const mysql = require('mysql2');
let iniparser = require('iniparser');
const bodyparser = require('body-parser')
const { urlencoded } = require('body-parser')

// activer les dépendances pour la bdd
let configDB = iniparser.parseSync('./DB.ini')
let mysqlconnexion = mysql.createConnection({
    host:configDB['database']['host'],
    user:configDB['database']['user'],
    password:configDB['database']['password'],
    database:configDB['database']['database']
})

router.get('/', (req, res) => {
    res.render('accueil');
});

router.get('/medecins', (req, res) => {
    // Requête SQL pour récupérer tous les médecins
    const query = 'SELECT * FROM medecin';
  
    mysqlconnexion.query(query, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des médecins :', err);
        res.status(500).send('Erreur lors de la récupération des médecins.');
        return;
      }
  
      // Rendre la page avec les médecins
      res.render('medecins', { medecins: results });
    });
  });

module.exports = router;