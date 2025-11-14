const connexion = require("../../config/db")
const mysql = require('mysql2/promise');

//CREATE - INSERT POST PUT
async function createtodo(title, description, due_time, status, user_id){
    try {
        const [result] = await connexion.execute("INSERT INTO todo (`title`, `description`,`due_time`, `status`,`user_id`) VALUES (?,?,?,?,?)", [title, description, due_time, status, user_id]);
        return result;
    }catch(err){
        console.log(err)
    }
}


//READ - SELECT GET RÉCUPÈRE TOUT LES TODOS
async function gettodos(){
    try {
        const [result] = await connexion.execute("SELECT * FROM todo");
        return result;
    } catch(err){
        throw err;
    }
}
//RÉCUPÈRE LES INFOS SUR ID
async function gettodobyid(id){
    try {
        const [result] = await connexion.execute("SELECT * FROM todo WHERE id = ?", [id]);
        return result;
    } catch(err){
        throw err;
    }
}

//RÉCUPÈRE LES INFOS SUR ID
async function gettodobyuserid(user_id){
    try {
        const [result] = await connexion.execute("SELECT * FROM todo WHERE user_id = ?", [user_id]);
        return result;
    } catch(err){
        throw err;
    }
}

//UPDATE - UPDATE PUT
async function updatetodo(id, title, description, due_time, status){
    try {
        const [result] = await connexion.execute("UPDATE todo SET title = ?, description = ?, due_time = ?, status = ? where id = ?", [title, description, due_time,status, id]);
        return result;
    } catch(err){
        throw err;
    }
}

//DELETE - DELETE ..
async function deletetodo(id){
    try {
        const [result] = await connexion.execute("DELETE FROM todo WHERE id = ?", [id]);
        return result;
    } catch(err){
        throw err;
    }
}

module.exports = {
    gettodos,
    gettodobyid,
    deletetodo,
    updatetodo,
    createtodo,
    gettodobyuserid
}