//VERIFIE UN TOKEN  
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function token (req, res, next) { //verifie l'itinairaire
    const token  = req.headers['authorization']; //obtenir la valeur du token ?
    const replaced = token.replace("Bearer ", "");
    console.log("token :\n", replaced)
    try {
        if (replaced){
            const decoded = jwt.verify(replaced, secret); //verifie le jeton
            req.userID = decoded.userID;
            next();

        } else { //réponse négative, donc erreur
            res.json("bah nn tu passe pas");
        }
    } catch(err) {
        res.status(419).json({result}); 
    }
};

module.exports = token

//419 jeton manquant ou expiré
//499 jeton requis, indique que le jeton n'est pas requis