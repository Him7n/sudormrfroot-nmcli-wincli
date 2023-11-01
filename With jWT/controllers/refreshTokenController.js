const cookieParser = require("cookie-parser");
const jwtt = require("jsonwebtoken");
const { handlelogin } = require("./authController");
const fspromises = require("fs").promises;
const bcrypt = require("bcrypt")
const users = require('../model/users.json');

const ACCESS_TOKEN_SECRET="2ce49d207d54013df055c61dc7956c366f203d93c01c216fcfa34bf1145b4870973c3d618b562e69b092c5f1d470657dd9f79cc612137ec87484935301db5d52"
  const REFRESH_TOKEN_SECRET="0c6e1f432fa3e4c6e096250d47520b54ff4368a58b20843365f6327b818a626f4d0f5da5e42d27ba770f67d6e9fac721ef5ce4157ab2372400fe381dfb5edd41"

  const usersDB = {
    users: require('../model/users.json'),
     setUsers: function (data) { this.users = data }
 }

 require("dotenv").config();

 const HandleRefreshToken = async (req,res)=>{

    const {username,password} = req.body;
    
    console.log(req.cookies);
    
    const {jwt} = req.cookies;
console.log(jwt)
// console.log(cookies);
if(!jwt) return res.json({"cookie nhi mil rahi jwt nhi mil raha" :"i don tknwo"});
// console.log(cookies.jwt);
// jai shree raam !!!
const refreshToken = jwt;
    //check if user doesnt even exsis or not
    const user = users.find((user)=> user.refreshToken == refreshToken );
    console.log(user);
    if(!user){
        return  res.status(400).json({"error":`${username} does not exists`});
    }



    jwtt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.status(403).json({"message":`kya errro : ${err.message} `}); //forbidden

            const accessToken = jwtt.sign(
              {  "username" : decoded.username},
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: '60s'
            }
            )

            res.json(accessToken);
        }
    )


 }
module.exports = {HandleRefreshToken};