const express = require("express")
const rooter = express.Router()
const connexion = require("../../config/db")
rooter.use(express.json())
const bcrypt = require("bcryptjs");
const token = require("../../middleware/auth")



const { deleteuser, updateuser, createuser, getusers, getuserinfosid, getuserinfosemail } = require("./user.query")

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


// RENVOIE LES DONNÉES POUR L'ID DE L'USER
rooter.get("/", token, async (req, res) =>{
    try {
        const id = req.userID
        const result = await getuserinfosid(id);
        res.json({result})
    } catch(err){
        console.log(err);
    }
});

// // RENVOIE LES DONNÉES POUR L'EMAIL DE L'USER
// rooter.get("/:email", async (req, res) =>{
//     try {
//         const email = req.params.email
//         const result = await getuserinfosemail(email);
//         res.json({message: " les donnes sont : ", result})

//     } catch(err){
//         console.log(err);
//     }
// });


module.exports = rooter;