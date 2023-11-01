const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const fspromises = require("fs").promises;
require("dotenv").config();
const ACCESS_TOKEN_SECRET="2ce49d207d54013df055c61dc7956c366f203d93c01c216fcfa34bf1145b4870973c3d618b562e69b092c5f1d470657dd9f79cc612137ec87484935301db5d52"
const verify = (req,res,next)=>{

    const  authheader = req.headers['authorization'];
    if(!authheader) return res.sendStatus(401)

    // bearer token
    console.log(authheader)

     const token = authheader.split(" ")[1]


console.log(token);

jwt.verify(
token,
ACCESS_TOKEN_SECRET,
(err,decoded)=>{
    if(err){ 
        
        console.log(`docoded mein problenm`)
        return  res.sendStatus(403)} // invalid token
    req.username = decoded.username;
    next();

}

)
}

module.exports = verify;