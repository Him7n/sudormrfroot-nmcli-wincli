 const users = require('../model/users.json');
 const path = require("path");
 const bcrypt  = require("bcrypt");

 const handlelogin = async (req,res)=>{

    const {username,password} = req.body;

    //check if user doesnt even exsis or not
    const user = users.find((user)=> user.username == username );
    if(!user){
        return  res.status(400).json({"error":`${username} does not exists`});
    }



    //compare the password ig I need teh async func 

     const compare = bcrypt.compareSync(password,user.password);
     if(compare){
res.status(200).json({"succces":"login successfull"});

     }else{
        res.json({"message": "Password galat hai"
    })
     }


 }
module.exports = {handlelogin};
