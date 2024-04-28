const { body, validationResult } = require('express-validator');

// Middleware pour valider les données d'un utilisateur
const validateUser = [
    body('name').notEmpty().withMessage('Le nom de l\'utilisateur est requis'),
    body('email').isEmail().withMessage('Adresse email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('role').isIn(['user', 'admin']).withMessage('Le rôle doit être "user" ou "admin"'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateUser;
