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
const jwt = require("jsonwebtoken")


const secret = process.env.SECRET; 

app.post("/generaterToken", (req,res)=>{
    const {email,password} = req.body

    const token = jwt.sign({email,password},secret,{expiresIn:'72h'})

    console.log(token,"token")
    res.status(200).send({message:"generated succesfully", token}) //fait appel à ma fonction token (idem token:token)

})

// VERIFIER LE TOKEN 

function token (req, res, next) { //verifie l'itinairaire
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