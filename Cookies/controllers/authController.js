 const users = require('../model/users.json');
 const path = require("path");
 const bcrypt  = require("bcrypt");
 const uuid = require("uuid");
 const cookieParser = require("cookie-parser");
 const sessions ={};

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

        //make the session 
const sessionToken = uuid.v4();
const expiresAt =  Date.now()+1*60*1000;
console.log(
    `expires at ${expiresAt}`
)
// const userid = sessions.length()+1 ||1
sessions[sessionToken] = {username ,expiresAt

}; //key value pair is stored in the backend database gonan pass that to the header the session ID in the form of cookie

res.cookie("session", sessionToken,{
    httpOnly : true ,
    expires: new Date(Date.now() +  1*10*1000)
});

// console.log(res.cookies);
// dono se same baat pad rahi

// res.set("Set-Cookie",`session=${sessionToken}`);

//header set kiya hai lekin header l ander expiring nhi daal paaya
// res.redirect('/home');
res.status(200).json({"succces":"login successfull"});

     }else{
        res.json({"message": "Password galat hai"
    })
     }


 }



 const handleLogout = (req,res)=>{
// const cookiefound = req.headers.cookie?.split('=')[1];
console.log(req.cookies);
 const {session} = req.cookies;
if(session){

res.cookie("session", null,{
    httpOnly : true ,
    expires:  new Date(Date.now())
});
console.log(res.cookies)
console.log("logout out")
   return  res.json({"message":"loged out"})
}else{

    console.log("login first")
 return   res.json({"message":"log in first"})


}

// console.log(session);
// const usersession = sessions[cookiefound];

// console.log(usersession);
// if(cookiefound!="null"){
    
//     console.log("you are loged in ");

// console.log('loging you out');
// delete sessions[cookiefound];

// res.set('Set-Cookie',`session=null`)
// return res.json({"success" :"logout successfully "})

// //session id kko null kardo

// }
// else {console.log("login first no session id found") ; 
//  return res.json({"message":"login first"})
// }

res.end();
 };

 const handleWelcome = (req,res)=>{

    //first check if you area loged in or not
console.log(req.cookies)
    const  {session} = req.cookies;

    if(session) return res.status(200).json({"sucess":"Welcome to the home page"})
    else return res.json({"message":"Log in first"});

 }

module.exports = {handlelogin , handleLogout,handleWelcome};
