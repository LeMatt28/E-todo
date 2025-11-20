//VERIFIE UN TOKEN  
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function token (req, res, next) { //verifie l'itinairaire
    try {
        const token  = req.headers['authorization']; //obtenir la valeur du token ?
        const replaced = token.replace("Bearer ", "");
        console.log("token :\n", replaced)
        if (replaced){
            const decoded = jwt.verify(replaced, secret); //verifie le jeton
            req.userID = decoded.userID;
            next();

        } else { //réponse négative, donc erreur
            res.status(401).json("no authorization");
        }
    } catch(err) {
        res.status(419).json(err); 
    }
};

module.exports = token