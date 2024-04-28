const getUserFromToken = require('../utils/getUserFromToken');


// Middleware pour vérifier le rôle d'administrateur
const isAdmin = async (req, res, next) => {
    // Récupérez le token de l'en-tête de la requête
    const token = req.headers.authorization.split(' ')[1]; // Supposons que le token est dans le format "Bearer <token>"

    // Obtenez les informations de l'utilisateur à partir du token
    const user = await getUserFromToken(token);
    console.log('Connected user: ', user);

    // Vérifie si l'utilisateur a le rôle d'administrateur
    if (user && user.role === 'admin') {
        // Si oui, passez à l'étape suivante
        next();
    } else {
        // Sinon, renvoie une réponse avec un statut non autorisé (401)
        return res.status(401).json({ message: 'Accès non autorisé. Vous devez être administrateur.' });
    }
};

module.exports = isAdmin;
