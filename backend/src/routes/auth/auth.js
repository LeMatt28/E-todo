const express = require("express")
const rooter = express.Router()
rooter.use(express.json())
const bcrypt = require("bcryptjs");
const { getuserinfosemail } = require("../user/user.query");

rooter.post("/", async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const users = await getuserinfosemail(null, email);

        if (users.length === 0){    
            return res.json("Utilisateur non trouvé");
        }
        const user = users[0];
        const match = await bcrypt.compare(req.body.password, user.password)
        
        if (!match) {
            return res.json("Mot de passe incorect")
        } else {
            return res.json("Bienvenue !")
        }
    } catch(err) {
        console.error(err.message)
    }
})

module.exports = rooter;