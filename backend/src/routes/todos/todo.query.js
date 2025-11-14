const connexion = require("../../config/db")
// const mysql = require('mysql2/promise');

// SQL SUPPRIMER USER
async function deleteuser(id){
    try {
        const [result] = await connexion.execute("DELETE FROM user WHERE id = ?", [id]);
        return result;
    } catch(err){
        throw err;
    }
}

// SQL MODIFIER USER
async function updateuser(id , email, password, name, firstname){
    try {
        const [result] = await connexion.execute("UPDATE user SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?", [email, password, name, firstname, id]);
        return result;
    } catch(err){
        throw err;
    }
}

// SQL CREER USER
 async function createuser(email, hash, name, firstname){
    try {
        const [result] = await connexion.execute("INSERT INTO user (`id`, `email`, `password`, `name`, `firstname`) VALUES (NULL,?,?,?,?)", [email, hash, name, firstname])
        return result;
    } catch(err){
        throw err;
    }
}

// SQL RECUPERER TOUT LES USERS
async function getusers(){
    try {
        const [result] = await connexion.execute("SELECT * FROM user");
        return result;
    } catch(err){
        throw err;
    }
}

// SQL RECUPERER LES INFOS DU USER EMAIL
async function getuserinfosemail(id, email){
    try {
        const [result] = await connexion.execute("SELECT id, email, password FROM user WHERE id =? OR email = ?", [id, email]);
        return result;
    } catch (err){
        throw err;
    }
}

// SQL RECUPERER LES INFOS DU USER ID
async function getuserinfosid(id){
    try {
        const [result] = await connexion.execute("SELECT id, email, password FROM user WHERE id = ?", [id]);
        return result;
    } catch(err){
        throw err;
    }
}



module.exports = {
    deleteuser,
    updateuser,
    createuser,
    getusers,
    getuserinfosid,
    getuserinfosemail
}