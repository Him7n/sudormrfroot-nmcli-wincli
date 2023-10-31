const usersDB = {
   users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const fs = require("fs").promises;
const path = require(
"path"
);
const bcrypt = require("bcrypt");
const handlenewuser =  async (req,res) => {
    const {usr,pwd} = req.body;

    if(!usr || !pwd) return res.status(400).json({"Message":"You need to provide me the username adn passwordk kiddo"});

    //checking for the duplicates

    const duplicate = usersDB.users.find(( people )=> people.username == usr );
    if(duplicate){
        return res.status().json({
            "message": ` ${usr} duplicate user found !! `        })
            
    }
    try{

        const hashed = bcrypt.hashSync(pwd,10);
        const newUser = {
           "username":usr,
           "password" : hashed
        }

        usersDB.setUsers([...usersDB.users, newUser]);

        await fs.writeFile(path.join(__dirname,"..","model","users.json"),JSON.stringify(usersDB.users));

        console.log(usersDB.users);
        res.status(200).json({"success":`user ${usr}  was created`});

    }catch(err){
        res.status(500).json(
            {
            "message":
            err.message
            }
            )
        // if(err) console.log(err.message);
    }

}

module.exports = {handlenewuser};