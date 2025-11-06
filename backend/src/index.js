const express = require("express")
const mysql = require("mysql")
const port = process.env.PORT || 5000

// MIDDLEWARE
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const db = require("./config/db")


// ROUTES 
const user = require("./routes/user/users") 
app.use("/user", user)

// REPONSE DU SERVEUR
app.get("/", (req,res) =>{
    res.send("weeeeesh")
})
app.listen(port, () => {
    console.log("serveur ca marche le s")
})   