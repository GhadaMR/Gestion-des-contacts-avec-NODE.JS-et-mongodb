// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Middleware pour analyser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données
require('./database');

// Modèle pour les données
const Donnee = mongoose.model('Donnee', {
    nom: String,
    prenom: String,
    telephone: Number,
    email: String,
    date_naissance: Number,
    nombreEnfants: Number
});

// Route pour le formulaire
app.post('/submit', (req, res) => {
    const { nom, prenom, telephone, email,date_naissance,nombreEnfants } = req.body;

    // Créez une nouvelle entrée dans la base de données
    const donnee = new Donnee({ nom, prenom,telephone, email,date_naissance,nombreEnfants });
    
    // Enregistrez-la
    donnee.save((err) => {
        if (err) {
            res.send('Erreur lors de l\'enregistrement.');
        } else {
            res.send('Données enregistrées avec succès.');
        }
    });
});

// Servez le formulaire HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Lancez le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
