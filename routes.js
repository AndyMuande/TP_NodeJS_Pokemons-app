const express = require('express');

const router = express.Router();
const pokemonsRoutes = require('./routes/pokemonsRoutes');
const usersRoutes = require('./routes/usersRoutes');


router.get('/', (req, res) => {
  res.send('Welcome to the API!');
});


router.use('/pokemons', pokemonsRoutes);
router.use('/users', usersRoutes);


module.exports = router;