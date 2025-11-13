/*
(async () => {
    const bcrypt = require('bcrypt')

    try {


        let text = "okay"

        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(text, salt)
        console.log(hash)

        let compare = await bcrypt.compare(text, hash)
        console.log(compare)
        
    } catch (error) {
        console.log(error.message)
    }

})()


//SANS SEL                                                  AVEC SEL
//le sel se rajoute au hash avec bcrypt                     tralala.ok => hergzjnokjtprtzefgauéfé
//tralala => hergzjnokjtprt                                 le sel permet de complexifier un mdp et d'empecher de le retrouver


bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(text, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

// Load hash from your password DB.
bcrypt.compare(text, hash, function(err, result) {
    // result == true
});
bcrypt.compare(stext, hash, function(err, result) {
    // result == false
});

*/

//CRÉE UN TOKEN

// { decodeBase64 } = require('bcryptjs')
const express = require('express')
const jwt = require("jsonwebtoken")
require('dotenv').config()

const app = express()
app.use(express.json())

const secret = process.env.JWT_SECRET; 

app.post("generaterToken", (req,res)=>{             //app.get("generaterToken", (req,res)=>{
    const {email, id} = req.body

    const token = jwt.sign({email, id},secret,{expiresIn:'1h'})

    console.log(token,"token")
    res.status(200).send({message:"generated succesfully", token}) //fait appel à ma fonction token (idem token:token)

    //generate a token
})

app.listen(5000,  ()=>{
    console.log("ok")
})

//FAIRE UN APPEL DE CONSTANTE DANS LES ROUTES

const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")
require("dotenv").config()
const port = process.env.PORT

// MIDDLEWARE
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const db = require("./config/db")


// ROUTES 
const reg = require("./routes/register/reg")
const user = require("./routes/user/users") 
const login = require("./routes/auth/auth")
app.use("/register", reg) 
app.use("/user", token, user)
app.use("/login", login)

//CRÉE UN TOKEN
const jwt = require("jsonwebtoken") //crée une route jwt


const secret = process.env.SECRET; 

app.post("/generaterToken", (req,res)=>{
    const {email,password} = req.body

    const token = jwt.sign({email,password},secret,{expiresIn:'72h'})

    console.log(token,"token")
    res.status(200).send({message:"generated succesfully", token}) //fait appel à ma fonction token (idem token:token)

})

// VERIFIER LE TOKEN 

function token (req, res, next) { //cree une fonction 
    try {
        const token  = req.header.token; //obtenir la valeur du token ?
        if (token){
            const decode = jwt.verify(token, secret); //verifie le jeton

            res.json("tu passe");
            next();

        } else { //réponse négative, donc erreur
            res.json("bah nn tu passe pas");
        }
    } catch(err) {
        console.error(err.message)
    }
};

// REPONSE DU SERVEUR
app.get("/", (req,res) =>{
    res.send("weeeeesh")
})
app.listen(port, () => {
    console.log("serveur ca marche le s")
})