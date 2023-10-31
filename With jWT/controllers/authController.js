 const users = require('../model/users.json');
 const path = require("path");
 const bcrypt  = require("bcrypt");
 const uuid = require("uuid");
 const cookieParser = require("cookie-parser");
 const sessions ={};
 const jwt = require("jsonwebtoken");
 const fspromises = require("fs").promises;

   const ACCESS_TOKEN_SECRET="2ce49d207d54013df055c61dc7956c366f203d93c01c216fcfa34bf1145b4870973c3d618b562e69b092c5f1d470657dd9f79cc612137ec87484935301db5d52"
  const REFRESH_TOKEN_SECRET="0c6e1f432fa3e4c6e096250d47520b54ff4368a58b20843365f6327b818a626f4d0f5da5e42d27ba770f67d6e9fac721ef5ce4157ab2372400fe381dfb5edd41"
 const usersDB = {
    users: require('../model/users.json'),
     setUsers: function (data) { this.users = data }
 }

 require("dotenv").config();
 const handlelogin = async (req,res)=>{

    const {username,password} = req.body;

    //check if user doesnt even exsis or not
    const user = users.find((user)=> user.username == username );
    if(!user){
        return  res.status(400).json({"error":`${username} does not exists`});
    }



    //compare the password ig I need teh async func 

     const compare = await bcrypt.compare(password,user.password);
     if(compare){



//JWT
// console.log(ACESSS_TOKEN_SECRET);


const accessToken = jwt.sign(
    {"username" : `${user.username}`},
  ACCESS_TOKEN_SECRET,
    {
        expiresIn : '60s'
    }
)
const refreshToken = jwt.sign(
    {"username" : `${user.username}`},
  REFRESH_TOKEN_SECRET,
    {
        expiresIn : '5m'
    }
)
//saving the user with the refresh token
const otherusers = users.filter((users)=> users.username != user.username );
const currentUser ={ user , refreshToken };
usersDB.setUsers([...otherusers,currentUser]);
//write to the file
 await fspromises.writeFile(path.join(__dirname,'..','model','users.json'),
 JSON.stringify(usersDB.users)
 )

 res.cookie("jwt",refreshToken,{httpOnly: true , maxAge : 1*60*60*1000})

res.status(200).json({"succces":"login successfull",
accessToken
});

     }else{
        res.sendStatus(401).json({"message": "Password galat hai"
    })
     }


 }






module.exports = {handlelogin };
