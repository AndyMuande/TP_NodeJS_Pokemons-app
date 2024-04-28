// Import des différentes dépendences
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();


require('dotenv').config();

// Création de l'appli express
let app = express();
let port = 3000;


app.use(cors());
app.use(express.json());

// Message de bienvenue sur localhost:3000
app.get('/', (req, res) => {
    res.send("Welcome to my backend");
});

// Les routes à utiliser sur localhost:3000/api
app.use('/api', routes);

// Connexion à la BDD MongoDB grâce à Mongoose
mongoose.connect(process.env.MONGO_URI, {})
.then(() => {
    console.log("Connecté à la BDD");
})
.catch((err) => {
    console.log("Erreur de connexion", err);
});


// Ici on lance l'appli sur le numéro de port en question
app.listen(port, () => {
    console.log("Serveur en ligne sur le port 3000");
})