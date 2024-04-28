const { body, validationResult } = require('express-validator');

// Middleware pour valider les données d'un Pokémon
const validatePokemon = [
  body('name')
  .notEmpty().withMessage('Le nom du Pokémon est requis')
  .isLength({ min: 3 }).withMessage('Le nom du Pokémon doit faire au moins 3 caractères'),

  body('cp').isInt({ min: 1, max: 100 }).withMessage('Le cp du Pokémon doit être un entier entre 1 et 100'),

  body('hp').isInt({ min: 1, max: 100 }).withMessage('Le hp du Pokémon doit être un entier entre 1 et 100'),

  body('types').notEmpty().withMessage('Le type du Pokémon est requis'),
  body('types').isArray().withMessage('Les types du Pokémon doit être renseignés dans un tableau'),
  body('types.*').isString().withMessage('Chaque élément du type doit être une chaîne de caractères'),

  body('picture').notEmpty().withMessage('La photo du Pokémon est requise'),

 (req, res, next)  =>  {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  next();
}

];

module.exports =  validatePokemon;