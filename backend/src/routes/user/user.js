const express = require("express")
const rooter = express.Router()
// const db = require("../../config/db")
const connexion = require("../../config/db")


rooter.get("/", (req, res) => {
    res.status(200).json({message: "Tout les userssssss" })
});

// RENVOIE LES DONNÉES POUR L'ID DE L'USER
rooter.get("/:id", (req, res) =>{
    const id = req.params.id
    connexion.query("SELECT * FROM user WHERE id = ?", [id], (err, rows) =>{
    if(err) throw err;
    res.json({message: " les donnes sont : ", data: rows})
})
})
module.exports = rooter;