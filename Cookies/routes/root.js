const express= require("express");
const path = require("path");
const router = express.Router();




//routes??
router.get('/',(req,res)=>{

    // res.redirect(301,'/file'); 
    // 302 by default //
    res.send("Yabure Yabure")
}) 


// http://localhost:3000/file
// http://localhost:3000/main.html
// .html is optional
//

router.get('/file|main(.html)?',(req,res)=>{
    //dirname says start from here 
    res.sendFile(path.join(__dirname,'..',"views","main.html"))
})


module.exports = router;