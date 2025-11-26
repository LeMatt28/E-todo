//VERIFIE UN TOKEN  
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function token (req, res, next) { //verifie l'itinairaire
    try {
        const token  = req.headers['authorization']; //obtenir la valeur du token ?
        if (!token){
            const err = new Error("No token, authorization denied");
            err.code = "NO_TOKEN";
            err.status = 401;
            return next(err);
        }
        const replaced = token.replace("Bearer ", "");
        console.log("token :\n", replaced);
        if (replaced){
            const decoded = jwt.verify(replaced, secret); //verifie le jeton
            req.userID = decoded.userID;
            next();
        } else {
            const err = new Error("No token, authorization denied");
            err.code = "NO_TOKEN";
            err.status = 401;
            return next(err);
        }
    } catch(err){
            err.code = "INVALID_TOKEN";
            err.status = 401;
            return next(err);
    }
};


module.exports = token