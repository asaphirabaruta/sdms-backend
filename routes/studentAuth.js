const jwt = require('jsonwebtoken');
const pool = require('../db');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res)=>{
    try {  
        const {reg, passcode}= req.body;
        const student = await pool.query(
            "SELECT * FROM students WHERE reg_number = $1" ,
            [reg]            
        )         
        if(student.rowCount == 0) return res.status(400).send("invalid Reg Number or password");        
        
        if(student && passcode == student.rows[0].passcode){
            const token = jwt.sign({reg:reg, name:student.rows[0].full_name}, process.env.JWTPRIVATEKEY); 
            res.send(token);            
        } else return res.send("invalid Reg Number or password");       
        
    } catch (err) {
        console.error(err.message);
    }    

})

module.exports = router;