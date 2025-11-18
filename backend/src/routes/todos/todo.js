const express = require("express")
const rooter = express.Router()
const connexion = require("../../config/db")
rooter.use(express.json())
const bcrypt = require("bcryptjs");
const token = require("../../middleware/auth")

const { deletetodo, updatetodo, createtodo, gettodos, gettodobyid} = require("../todos/todo.query")

// GET TOUTES LES TACHES DE LA TABLE
rooter.get("/", async (req,res) => {
    try{
        const result = await gettodos(id)
        res.status(200).json({result})
    }catch(err){
        res.status(500).json({result})
    }
})

// GET LA TACHE PAR L'ID
rooter.get("/:id", async (req,res) => {
    try{
        const id = req.params.id
        const result = await gettodobyid(id)
        res.status(200).json({result})
    }catch(err){
        res.status(500).json({result})
    }
})

// CREER LA TACH
rooter.post("/", token, async (req,res) => {
    try{
        const user_id = req.userID
        const { title, description, due_time, status} = req.body
        const result = await createtodo(title, description, due_time, status, user_id)
        res.status(200).json({result})
    }catch(err){
        res.status(500).json({result})
    }
})

// MODIFIER LA TACHE
rooter.put("/:id", token, async (req,res) => {
    try{
        const id = req.params.id
        const { title, description, due_time, status} = req.body
        const result = await updatetodo(id,title, description, due_time, status)
        res.status(200).json({result})
    }catch(err){
        res.status(500).json({result})
    }
})

// SUPPRIMER LA TACHE
rooter.delete("/:id", token, async (req, res) => {
    try {
        const id = req.params.id
        const result = await deletetodo(id);
        return res.status(200).json({result,message : "supprime le s " });
    }catch(err){
        res.status(500).json({result})
    }
})

module.exports = rooter;