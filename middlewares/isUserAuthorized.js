const getUserIdFromToken = require('../utils/getUserIdFromToken');


// Middleware pour vérifier si l'utilisateur est autorisé à modifier ou supprimer son propre profil
const isUserAuthorized = (req, res, next) => {
    try {
        // Récupérez le token de l'en-tête de la requête
        const token = req.headers.authorization.split(' ')[1]; // Supposons que le token est dans le format "Bearer <token>"

        // Obtenez les informations de l'utilisateur à partir du token
        const userId = getUserIdFromToken(token);
        console.log('Connected userId: ', userId);

        // Récupérez l'ID de l'utilisateur connecté
        const loggedInUserId = userId;

        // Récupérez l'ID de l'utilisateur dont le profil doit être modifié ou supprimé
        const userIdFromRequest = req.params.id; // Ou où que ce soit où vous stockez l'ID de l'utilisateur dans la requête

        // Vérifiez si l'ID de l'utilisateur connecté correspond à l'ID de l'utilisateur dans la requête
        if (loggedInUserId === userIdFromRequest) {
            // Si oui, l'utilisateur est autorisé à modifier ou supprimer son propre profil
            next();
        } else {
            // Sinon, renvoyez une réponse avec un statut non autorisé (403)
            return res.status(403).json({ message: 'Accès non autorisé. Vous n\'êtes pas autorisé à modifier ou supprimer ce profil.' });
        }
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse avec un statut de serveur interne (500)
        console.error(error);
        return res.status(500).json({ message: 'Erreur serveur lors de la vérification de l\'autorisation de l\'utilisateur.' });
    }
};

module.exports = isUserAuthorized;
