const express = require("express")
const rooter = express.Router()
const connexion = require("../../config/db")
rooter.use(express.json())

// CREER UN UTILISATEUR
rooter.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const firstname = req.body.firstname;

    connexion.query("INSERT INTO user (`id`, `email`, `password`, `name`, `firstname`) VALUES (NULL,?,?,?,?)", [email, password, name, firstname, ], (err, results) => {
        if(err) throw err;
        res.json({message: "c'est doog le reuf c ajouté"})
    })

});


// LISTE DES UTILISATEURS ET LEURS INFOS 
rooter.get("/", (req, res) => {
    connexion.query("SELECT * FROM user", (err, rows) => {
        if(err) throw err;
        res.send({message : "les utilisateurs sont : ", rows })
    })
});


// MODIFIER UN UTILISATEUR
rooter.put("/:id", (req, res) => {
    const id = req.params.id
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const firstname = req.body.firstname;

    connexion.query("UPDATE user SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?", [email, password, name, firstname, id], (err, results) => {
        if(err) throw err;
        res.json({message: "utilisateur modifié"})
    })

});

// SUPPRIMER UN UTILISATEUR
rooter.delete("/:id", (req, res) => {
    const id = req.params.id
    connexion.query("DELETE FROM user WHERE id = ?", [id], (err, results) => {
        if(err) throw err;
        res.json({message: "Utilisateur supprimé"})
    })

});

// RENVOIE LES DONNÉES POUR L'ID DE L'USER
rooter.get("/:id", (req, res) =>{
    const id = req.params.id
    connexion.query("SELECT * FROM user WHERE id = ?", [id], (err, rows) =>{
    if(err) throw err;
    res.json({message: " les donnes sont : " , rows})
})
});
module.exports = rooter;