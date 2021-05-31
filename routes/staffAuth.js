const jwt = require('jsonwebtoken');
const pool = require('../db');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res)=>{
    try {  
        const {email, passcode}= req.body;
        const staff = await pool.query(
            "SELECT * FROM staffs WHERE staff_email = $1" ,
            [email]            
        )         
        if(staff.rowCount == 0) return res.status(400).send("invalid Email or password");        
        
        if(staff && passcode == staff.rows[0].passcode){
            const token = jwt.sign({email:email, name:staff.rows[0].staff_name, isAdmin:staff.rows[0].isadmin}, process.env.JWTPRIVATEKEY); 
            res.send(token);            
        } else return res.send("invalid Email or password");       
        
    } catch (err) {
        console.error(err.message);
    }    

})

module.exports = router;

