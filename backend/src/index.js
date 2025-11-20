const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")
require("dotenv").config()
const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const db = require("./config/db")


// ROUTES 
const reg = require("./routes/register/reg")
const user = require("./routes/user/users") 
const login = require("./routes/auth/auth")
const todos = require("./routes/todos/todo")
const token = require("./middleware/VerifToken")
app.use("/register", reg) 
app.use("/login", login)
app.use(user)
app.use("/todos", todos)

// REPONSE DU SERVEUR
app.get("/", (req,res) =>{
    res.send("weeeeesh")
})

app.use(express.static(__dirname + "/../../frontend"));


app.get("/login", (req,res) =>{
res.sendFile("index.html", {root: __dirname + "/../../frontend"});
    
})

app.get("/dashboard", token ,(req,res) =>{
    console.log("Test")
    res.sendFile("oui.html", {root: __dirname + "/../../frontend"});
    
})

app.get("/register", (req,res) =>{
    res.sendFile("register.html", {root: __dirname + "/../../frontend"});
    
})



app.listen(port, () => {
    console.log("Server is running...")
})