const connexion = require("../../config/db")

// SQL SUPPRIMER USER
function deleteuser(id, callback) {
    connexion.query("DELETE FROM user WHERE id = ?", [id], callback)
}

// SQL MODIFIER USER
function updateuser(id , email, password, name, firstname, callback){
    connexion.query("UPDATE user SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?", [email, password, name, firstname, id], callback)
}

// SQL CREER USER
function createuser(email, password, name, firstname, callback){
    connexion.query("INSERT INTO user (`id`, `email`, `password`, `name`, `firstname`) VALUES (NULL,?,?,?,?)", [email, password, name, firstname, ], callback)
}

// SQL RECUPERER TOUT LES USERS
function getusers(callback){
    connexion.query("SELECT * FROM user", callback)
}

// SQL RECUPERER LES INFOS DU USER EMAIL
function getuserinfosemail(id, email, callback){
    connexion.query("SELECT id, email, password FROM user WHERE id =? OR email = ?", [id, email], callback)
}

// SQL RECUPERER LES INFOS DU USER ID
function getuserinfosid(id, callback){
    connexion.query("SELECT id, email, password FROM user WHERE id = ?", [id], callback)
}



module.exports = {
    deleteuser,
    updateuser,
    createuser,
    getusers,
    getuserinfosid,
    getuserinfosemail
}