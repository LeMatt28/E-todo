const express = require("express")
const rooter = express.Router()
rooter.use(express.json())
const bcrypt = require("bcryptjs");
const {createuser, getuserinfosemail} = require("../user/user.query")

// CREER UN UTILISATEUR
rooter.post("/", async (req, res) => {
    try {
        const { email, name, firstname } = req.body;
        const password = req.body.password
        const ouiounon = await getuserinfosemail(email)
        console.log(ouiounon)
        if(ouiounon.length > 0){
            return res.json("Utilisateur déjà existant.")
        } else {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt);


            const result = await createuser(email, hash, name, firstname);
            return res.json("Compte crée avec succès !"); //res.status(201).json({message: "Compte créée avec succès !"});
        }
        } catch(err) {
        res.status(500).json({result})
    }
});
module.exports = rooter;

