const express = require("express")
const mysql = require("mysql")
const port = process.env.PORT || 5000

const app = express()
const db = require("./config/db")
// ROUTES 
const user = require("./routes/user/user") 
app.use("/user", user)

// REPONSE DU SERVEUR
app.get("/", (req,res) =>{
    res.send("weeeeesh")
})
app.listen(port, () => {
    console.log("serveur ca marche le s")
})   