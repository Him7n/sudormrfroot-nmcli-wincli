const exp = require("constants");
const express = require("express");
const app = express();
const path= require("path")
const cors = require("cors");
const {logEvents,logger} = require('./middlewares/logEvents');
const { error } = require("console");
const { resourceUsage } = require("process");
const errorHandler = require("./middlewares/errorHandler")
const corsoptions = require('./config/corsOptions');


//custom middlware
// app.use((req,res,next)=>{
    //     console.log(`${req.method} ${req.path}`);
    //     logEvents(`${req.method} \t ${req.headers.orgin} \t ${req.url}`,'reqLog.txt');
    //     next();
    // })
    app.use(logger);
    
    // Cross Origin resource sharing

app.use(cors(corsoptions));
            

//built in middleware to handle urlencoded data
//form data
//'content-type':application/'x-www-form-urlencoded
//this will apply to all the upcomoing rutes
//top pe means sabpe lagega
//built in middleware didnt need the next() but custom middlware uses the next()
app.use(express.urlencoded({extended:false}));

//built in middleware for json
app.use(express.json());

//serve static files  // css k liye

app.use(express.static(path.join(__dirname,'/public')))


const PORT = process.env.PORT || 3000;
//imause low level  c r l u http://localhost:3000/
// wget gives more information

//waterfall

//exprss also handles the regex too
// ^/&|main.html -- must beign and end  with the / or its main.html


//Route handlers 
// app.get('/',(req,res,next)=>{

//     next();

// },(req,res)=>{

// })
//**/ ROUTES */

app.use('/',require('./routes/root.js'))
app.use('/employees',require('./routes/api/employees'))
app.use('/users',require('./routes/api/register'))
app.use('/login',require('./routes/api/auth'));

                        // app.get('/',(req,res)=>{

                        //     // res.redirect(301,'/file'); 
                        //     // 302 by default //
                        //     res.send("Yabure Yabure")
                        // })
// http://localhost:3000/file
// http://localhost:3000/main.html
// .html is optional
//

// app.get('/file|main(.html)?',(req,res)=>{
//     //dirname says start from here 
//     res.sendFile(path.join(__dirname,"views","main.html"))
// })

 //404
        // app.get('/*',(req,res)=>{
        //     // console.log('its a 404 page')
        //     res.status(404).send("its a 404 page with status code 404");
        // })
app.all("*",(req,res)=>{
res.status(404);
if(req.accepts('html')){
res.sendFile(path.join(__dirname,'views','404.html'));
}else if(req.accepts('json')){
res.json({error: "this is a json 404 error object"});
}else{
    res.type('txt').send('yamate yamate 404 in text');
}
})


//custom error handler
app.use(errorHandler);
app.listen(PORT,()=>{console.log(`listening to port ${PORT} waku waku`)})
// http://localhost:3000/main