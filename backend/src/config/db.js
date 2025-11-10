require("dotenv").config();
const mysql2 = require("mysql2/promise");

// Déclaration du pool en premier
const connexion = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// IIFE juste pour tester la connexion
(async () => {
  try {
    const [rows] = await connexion.query("SELECT 1");
    console.log("✅AAAAAAAAAAA");
  } catch (err) {
    console.error("❌ Erreur :", err.message);
  }
})();

// Export pour les autres fichiers
module.exports = connexion;
