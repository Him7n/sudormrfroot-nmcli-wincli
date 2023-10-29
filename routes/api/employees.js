const express = require("express");
const { url } = require("inspector");
const router = express.Router();
const path = require("path");
const data={};

data.employees = require('../../data/employees.json');

// instead of doing router .get router.post router.put router.ddlete we can do router.route and then chain diffrent methods  for the same url


router.route('/')
 .get((req,res,next)=>{
    res.json(data.employees);
 })
 .post((req,res)=>{

    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname
    })

 })

.put((req,res)=>{
    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname
    })
})
.delete((req,res)=>{
    res.json({ id:  `${req.body.id} was deleted` })
})


router.route('/:id')
.get((req,res)=>{
     res.json({"id":req.params.id})
});
module.exports = router;