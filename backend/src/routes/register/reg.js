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
        const Email = await getuserinfosemail(email)
        if(Email.length > 0){
            res.status(500).json("User already exist.")
        } else {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt);


            const result = await createuser(email, hash, name, firstname);
            return res.status(200).json("Account successfully created !")
        }
        } catch(err) {
            res.status(500).json(err)
    }
});
module.exports = rooter;

