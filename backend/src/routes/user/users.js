const express = require("express")
const rooter = express.Router()
const connexion = require("../../config/db")
rooter.use(express.json())
const bcrypt = require("bcryptjs");
const token = require("../../middleware/VerifToken")



const { deleteuser, updateuser, getuserinfosid, getuserinfosemail} = require("./user.query");
const { gettodobyuserid } = require("../todos/todo.query");

// MODIFIER UN UTILISATEUR
rooter.put("/users/:id", token, async (req, res) => {
    try {
        const id = req.headers.id
        const { email, password, name, firstname } = req.body;

        const result = await updateuser(id , email, password, name, firstname);
        res.status(200).json({ message: "Utilisateur modifié avec succès !" });
    } catch(err) {
        res.status(500).json(err);
    }
});

// SUPPRIMER UN UTILISATEUR
rooter.delete("/users/:id", token, async (req, res) => {
    try {
        const id = req.params.id
        const result = await deleteuser(id);
        res.status(200).json({ message: "User succefully deleted !" });
    } catch (err){
        res.status(500).json(err);
    }

});


// RENVOIE LES DONNÉES POUR L'ID DE L'USER                 GET/user
rooter.get("/user", token, async (req, res) =>{
    try {
        const id = req.userID
        const result = await getuserinfosid(id);
        res.status(200).json({result})
    } catch(err){
        res.status(500).json(err);
    }
});

// RENVOIE LES DONNÉES POUR L'ID DE L'USER               GET/user/todos

rooter.get("/user/todos", token, async (req, res) =>{
    try {
        const user_id = req.userID
        const result = await gettodobyuserid(user_id);
        res.status(200).json({result})
    } catch(err){
        res.status(500).json(err);
    }
});

rooter.get("/users/:param", token, async (req, res) => {
    try {
        const param = req.params.param;
        let result;

        if (param.includes("@")) {
            // C'est un email
            result = await getuserinfosemail(param);
        } else {
            // C'est un id
            result = await getuserinfosid(param);
        }

        res.status(200).json({ message: "les données sont :", result });
    } catch(err){
        res.status(500).json(err)
    }
});


module.exports = rooter;