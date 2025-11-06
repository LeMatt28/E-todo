const express = require("express")
const rooter = express.Router()
const connexion = require("../../config/db")
rooter.use(express.json())

const { deleteuser, updateuser, createuser, getusers, getuserinfosid, getuserinfosemail } = require("./user.query")

// CREER UN UTILISATEUR
rooter.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const firstname = req.body.firstname;

    createuser(email, password, name, firstname,  (err, results) => {
        if(err) throw err;
        res.json({message: "c'est doog le reuf c ajouté"})
    })

});


// MODIFIER UN UTILISATEUR
rooter.put("/:id", (req, res) => {
    const id = req.params.id
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const firstname = req.body.firstname;

    updateuser(id, email, password, name, firstname, (err, results) => {
        if(err) throw err;
        res.json({message: "utilisateur modifié"})
    })

});

// SUPPRIMER UN UTILISATEUR
rooter.delete("/:id", (req, res) => {
    const id = req.params.id

    deleteuser(id, (err, results) => {
        if(err) throw err;
        res.json({message: "Utilisateur supprimé"})
    })

});


// LISTE DES UTILISATEURS ET LEURS INFOS 
rooter.get("/", (req, res) => {
    getusers((err, rows) => {
        if(err) throw err;
        res.send({message : "les utilisateurs sont : ", rows })
    })
});


// RENVOIE LES DONNÉES POUR L'ID DE L'USER
rooter.get("/:id", (req, res) =>{
    const id = req.params.id

    getuserinfosid(id, (err, rows) =>{
        if(err) throw err;
        res.json({message: " les donnes sont : " , rows})
})
});

// RENVOIE LES DONNÉES POUR L'EMAIL DE L'USER
rooter.get("/:email", (req, res) =>{
    const email = req.params.email
    
    getuserinfosemail(email, (err, rows) =>{
        if(err) throw err;
        res.json({message: " les donnes sont : " , rows})
})
});


module.exports = rooter;