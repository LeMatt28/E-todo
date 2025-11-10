const express = require("express")
const rooter = express.Router()
const connexion = require("../../config/db")
rooter.use(express.json())
const bcrypt = require("bcryptjs");



const { deleteuser, updateuser, createuser, getusers, getuserinfosid, getuserinfosemail } = require("./user.query")

// CREER UN UTILISATEUR
rooter.post("/", async (req, res) => {
    try {
        const { email, name, firstname } = req.body;
        const password = req.body.password

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt);


        const result = await createuser(email, hash, name, firstname);
        res.json({ message: "Utilisateur crée avec succès !" });
        } catch(err) {
        console.log(err)
    }
});

// MODIFIER UN UTILISATEUR
rooter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const { email, password, name, firstname } = req.body;

        const result = await updateuserr(id , email, password, name, firstname);
        res.json({ message: "Utilisateur modifié avec succès !" });
    } catch(err) {
        console.log(err)
    }
});

// SUPPRIMER UN UTILISATEUR
rooter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const result = await deleteuser(id);
        res.json({ message: "Utilisateur supprimé avec succès !" });
    } catch (err){
        console.log(err);
    }

});


// LISTE DES UTILISATEURS ET LEURS INFOS 
rooter.get("/", async (req, res) => {
    try {
        const result = await getusers();
        res.json({message: " utilisateurs : ", result})

    } catch(err){
        console.log(err);
    }
});


// RENVOIE LES DONNÉES POUR L'ID DE L'USER
rooter.get("/:id", async (req, res) =>{
    try {
        const id = req.params.id
        const result = await getuserinfosid(id);
        res.json({message: " les donnes sont : ", result})
    } catch(err){
        console.log(err);
    }
});

// RENVOIE LES DONNÉES POUR L'EMAIL DE L'USER
rooter.get("/:email", async (req, res) =>{
    try {
        const email = req.params.email
        const result = await getuserinfosemail(email);
        res.json({message: " les donnes sont : ", result})

    } catch(err){
        console.log(err);
    }
});


module.exports = rooter;