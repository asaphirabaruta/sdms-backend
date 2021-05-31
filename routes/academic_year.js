const pool = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    const ay= await pool.query(
        "SELECT * FROM academic_year"
    );

    res.json(ay.rows);

})

router.post('/', async(req, res)=>{

})

router.get('/:id', async(req,res)=>{

})

router.put('/:id', async(req, res)=>{

})

router.delete('/:id', async(req, res)=>{
    
})

module.exports = router;