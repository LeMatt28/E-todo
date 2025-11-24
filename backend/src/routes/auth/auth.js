const express = require("express")
const rooter = express.Router()
rooter.use(express.json())
const bcrypt = require("bcryptjs");
const { getuserinfosemail } = require("../user/user.query");
const jwt = require("jsonwebtoken")



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



rooter.post("/", async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const users = await getuserinfosemail(email);

        if (users.length === 0){    
            return res.status(404).json("Utilisateur non trouvé");
        }
        const user = users[0];
        const match = await bcrypt.compare(req.body.password, user.password)
        
        if (!match) {
            return res.status(401).json("Mot de passe incorect")
        } else {
            // TOKEN 
            const secret = process.env.SECRET; 
            const token = jwt.sign({userID: user.id},secret,{expiresIn:'20h'})
            console.log(token,"token")
            // TOKEN
            res.status(201).json({token})
        }
    } catch(err) {
        res.status(419).json(err)
    }
})

module.exports = rooter;






