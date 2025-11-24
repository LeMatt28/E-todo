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
    res.sendFile("dashboard.html", {root: __dirname + "/../../frontend"});
    
})

app.get("/register", (req,res) =>{
    res.sendFile("register.html", {root: __dirname + "/../../frontend"});
    
})


app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err); // passe au middleware global d’erreurs
});


app.use(function(err,req,res,next) {
    console.error(err);
        if (err.code === "NO_TOKEN"){
            return res.status(401).json({message: "No token, authorization denied"})
        }
        if (err.code === "INVALID_TOKEN"){
            return res.status(401).json({message: "Token is not valid"})

        }
        if (err.status === 404) {
            return res.status(404).json({message: "Not found"})

        }
        if (err.status === 400) {
            return res.status(400).json({message: "Bad parameter"})

        } else {
            return res.status(500).json({message: "Internal server error"})

        }
})

app.listen(port, () => {
    console.log("Server is running...")
})