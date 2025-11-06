const mysql = require("mysql")

// DÉFINITION DE LA CONNEXION A LA BASE
const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "TonMotDePasse",
    database: "etodo"
})

// CONNEXION A LA BASE DE DONNÉES
connexion.connect((err) => {
    if(err){
        console.error("erreur de co :" + err.stack)
        return;
    } else {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    }
}); 

module.exports = connexion