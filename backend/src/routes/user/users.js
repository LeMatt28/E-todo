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
        console.log("update")
        const id = req.headers.id
        const { email, password, name, firstname } = req.body;

        const result = await updateuser(id , email, password, name, firstname);
        res.json({ message: "Utilisateur modifié avec succès !" });
    } catch(err) {
        console.log(err)
    }
});

// SUPPRIMER UN UTILISATEUR
rooter.delete("/users/:id", token, async (req, res) => {
    try {
        const id = req.params.id
        const result = await deleteuser(id);
        res.json({ message: "Utilisateur supprimé avec succès !" });
    } catch (err){
        console.log(err);
    }

});


// RENVOIE LES DONNÉES POUR L'ID DE L'USER                 GET/user
rooter.get("/user", token, async (req, res) =>{
    try {
        const id = req.userID
        const result = await getuserinfosid(id);
        res.json({result})
    } catch(err){
        console.log(err);
    }
});

// RENVOIE LES DONNÉES POUR L'ID DE L'USER               GET/user/todos

rooter.get("/user/todos", token, async (req, res) =>{
    try {
        const user_id = req.userID
        const result = await gettodobyuserid(user_id);
        res.json({result})
    } catch(err){
        console.log(err);
    }
});

rooter.get("/users/:param", token, async (req, res) => {
  const param = req.params.param;
  let result;

  if (param.includes("@")) {
    // C'est un email
    result = await getuserinfosemail(param);
  } else {
    // C'est un id
    result = await getuserinfosid(param);
  }

  res.json({ message: "les données sont :", result });
});

// // RENVOIE LES DONNÉES POUR L'EMAIL DE L'USER
// rooter.get("/users/:email", async (req, res) =>{
//     try {
//         const email = req.params.email
//         const result = await getuserinfosemail(email);
//         res.json({message: " les donnes sont : ", result})

//     } catch(err){
//         console.log(err);
//     }
// });

// // RENVOIE LES DONNÉES POUR L'ID EN PARAMS DE L'USER
// rooter.get("/users/:id", async (req, res) =>{
//     try {
//         const id = req.params.id
//         const result = await getuserinfosid(id);
//         res.json({message: " les donnes sont : ", result})

//     } catch(err){
//         console.log(err);
//     }
// });



module.exports = rooter;