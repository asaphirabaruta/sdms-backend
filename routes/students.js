const pool = require('../db');
const express = require ('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    try {
        const allStudents = await pool.query(
            "SELECT ROW_NUMBER() OVER() AS num, * FROM students"
        );
    
        res.status(200).json(allStudents.rows);
        
    } catch (err) {
        console.error(err.message);
    }       
})

router.post('/', async(req, res)=>{
    try {
        const { reg, name, email, passcode } = req.body;
        const newStudent = await pool.query(
        "INSERT INTO students VALUES($1,$2,$3,$4)",
        [reg, name, email, passcode]
    );

    res.status(201).json("A student is Registered.");
        
    } catch (err) {
        console.error(err.message);
    }    

})

router.get('/:reg', async(req,res)=>{
    try {
        const { reg } = req.params;
        const student = await pool.query(
            "SELECT * FROM students WHERE reg_number=$1",
            [reg]
        );

        res.json(student.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }

})

router.put('/:reg', async(req, res)=>{
    try {
        const {reg} = req.params;
        const { name, email, passcode } = req.body;
        const student = await pool.query(
            "UPDATE students SET full_name=$1, student_email=$2, passcode=$3 WHERE reg_number=$4",
            [name, email, passcode, reg]
        )        
        res.json("Student details are updated.");        
        
    } catch (err) {
        console.error(err.message);
    }

})

router.delete('/:reg', async(req, res)=>{
    try {
        const {reg} = req.params;
        const student = await pool.query(
            "DELETE FROM students WHERE reg_number=$1",
            [reg]
        )
        res.json("A student was deleted.");

    } catch (err) {
        console.error(err.messsage);
    }
    
})

module.exports = router;