const express = require("express")
const rooter = express.Router()
const connexion = require("../../config/db")
rooter.use(express.json())
const bcrypt = require("bcryptjs");
const token = require("../../middleware/auth")



const { deleteuser, updateuser, getuserinfosid} = require("./user.query");
const { gettodobyuserid } = require("../todos/todo.query");

// MODIFIER UN UTILISATEUR
rooter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const { email, password, name, firstname } = req.body;

        const result = await updateuser(id , email, password, name, firstname);
        res.status.json({ message: "Utilisateur modifié avec succès !" });
    } catch(err) {
        res.status(500).json({result});
    }
});

// SUPPRIMER UN UTILISATEUR
rooter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const result = await deleteuser(id);
        res.status.json({ message: "Utilisateur supprimé avec succès !" });
    } catch (err){
        res.status(500).json({result});
    }

});


// RENVOIE LES DONNÉES POUR L'ID DE L'USER
rooter.get("/", token, async (req, res) =>{
    try {
        const id = req.userID
        const result = await getuserinfosid(id);
        res.status().json({result})
    } catch(err){
        res.status(500).json({result});
    }
});

// RENVOIE LES DONNÉES POUR L'ID DE L'USER
rooter.get("/todos", token, async (req, res) =>{
    try {
        const user_id = req.userID
        const result = await gettodobyuserid(user_id);
        res.status().json({result})
    } catch(err){
        res.status(500).json({result});
    }
});

// RENVOIE LES DONNÉES POUR L'EMAIL DE L'USER
rooter.get("/:email", async (req, res) =>{
    try {
        const email = req.params.email
        const result = await getuserinfosemail(email);
        res.status().json({message: " les donnes sont : ", result})
    } catch(err){
        res.status(500).json({reuslt});
    }
});


module.exports = rooter;