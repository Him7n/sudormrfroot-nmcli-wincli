
const whitelist=['https://www.google.com','http://localhost:3000'];  
const corsoptions ={
    origin:(origin,callback)=>{

        //!ORIGIN MEANS UNDEFINED KO BHI ALLLOW KARDO
        if(whitelist.indexOf(origin)!==-1 || !origin ){
            callback(null,true)
        }else{
            callback(new Error("Not allowed bt cors"));
        }
    },
    optionsSuccessStatus:200
}      


module.exports = corsoptions;