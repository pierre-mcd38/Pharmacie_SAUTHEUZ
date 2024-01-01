//initialisation des variables
const express = require('express');
const app = express();
const mysql = require('mysql2');
const router = express.Router();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

//initialisation des différentes routes
const accueilRoute = require('./routes/accueilRoute');
const medecinsRoute = require('./routes/medecinsRoute');
const ordonnanceRoute = require('./routes/ordonnanceRoute');

//connection à la base de donnée
const iniparser = require('iniparser');
const configDB = iniparser.parseSync('./DB.ini')

let mysqlconnexion = mysql.createConnection({
    host:configDB['database']['host'],
    user:configDB['database']['user'],
    password:configDB['database']['password'],
    database:configDB['database']['database']
   })

   mysqlconnexion.connect((err) => {
    if (!err) console.log('BDD connectée.')
    else console.log('BDD connexion échouée \n Erreur: '+JSON.stringify(err))
   });

   
//initialisation des images
const logo = '/images/logo.png';
const pharmacie = '/image/fond_pharmacie.jpg';
const style = '/css/style.css';

app.locals.logo = logo;
app.locals.pharmacie = pharmacie;
app.locals.style = style;

//definition des routes
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(medecinsRoute);
app.use(accueilRoute);
app.use(ordonnanceRoute);

app.get('/', (req, res) => {
    res.send('accueil');
});

//vérification de connection à la base
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Le serveur tourne sur le port : ${port}`));

module.exports = app;