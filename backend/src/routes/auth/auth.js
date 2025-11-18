const express = require("express")
const rooter = express.Router()
rooter.use(express.json())
const bcrypt = require("bcryptjs");
const { getuserinfosemail } = require("../user/user.query");
const jwt = require("jsonwebtoken")


rooter.post("/", async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const users = await getuserinfosemail(email);

        if (users.length === 0){    
            return res.json("Utilisateur non trouvé");
        }
        const user = users[0];
        const match = await bcrypt.compare(req.body.password, user.password)
        
        if (!match) {
            return res.json("Mot de passe incorect")
        } else {
            // TOKEN 
            const secret = process.env.SECRET; 
            const token = jwt.sign({userID: user.id},secret,{expiresIn:'20h'})
            console.log(token,"token")
            // TOKEN
            res.json("c good") //res.status(200).json({result})
        }
    } catch(err) {
        res.status(419).json({result})
    }
})

module.exports = rooter;

//419 jeton manquant ou expiré
//499 jeton requis, indique que le jeton n'est pas requis






