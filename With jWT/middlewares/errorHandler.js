const {logEvents} = require("./logEvents")
const errorHandler = (err,req,res,next,)=>{
    console.log(err.stack);
    res.status(500).send(err.message);

    logEvents(`Error Message ${err.status} \t ${err.message}\t ${err.name} `,'errlog.txt');
}
module.exports = errorHandler;

