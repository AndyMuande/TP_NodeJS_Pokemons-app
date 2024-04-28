const express = require('express');
const router = express.Router();

const pokemonController = require('../controllers/pokemonController');
const verifyToken = require('../middlewares/verifyToken')
const validatePokemon = require('../middlewares/pokemonValidator');
const isAdmin = require('../middlewares/isAdmin')

const multer = require('multer');
const { uploadImage } = require('../controllers/imageController');
const storage = multer.memoryStorage(); // Stocker les fichiers en mémoire pour un traitement plus facile
const upload = multer({ storage });

//Upload Pokemon image to AWS S3
router.post('/upload', upload.single('image'), uploadImage);


// Get all pokemons
router.get('/', verifyToken, pokemonController.getAllPokemons);

// Create a pokemon
router.post('/', verifyToken, validatePokemon, pokemonController.createPokemon);

// Get One Pokemon
router.get('/:id', verifyToken, pokemonController.getOnePokemon);

// Edit a pokemon
router.put('/:id', verifyToken, isAdmin, validatePokemon, pokemonController.editPokemon);

// Delete a pokemon
router.delete('/:id', verifyToken, isAdmin, pokemonController.deletePokemon);


module.exports = router;