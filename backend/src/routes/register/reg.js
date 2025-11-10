const express = require("express")
const rooter = express.Router()
rooter.use(express.json())
const bcrypt = require("bcryptjs");
const {createuser} = require("../user/user.query")

// CREER UN UTILISATEUR
rooter.post("/", async (req, res) => {
    try {
        const { email, name, firstname } = req.body;
        const password = req.body.password

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt);


        const result = await createuser(email, hash, name, firstname);
        return res.json("Compte crée avec succès !");
        } catch(err) {
        console.log(err)
    }
});
module.exports = rooter;