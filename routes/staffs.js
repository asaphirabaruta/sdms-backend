const pool = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    try {
        const allStaffs = await pool.query(
            "SELECT staffs.*,roles.role_name FROM staffs INNER JOIN roles ON staffs.role_id = roles.role_id"
        );
        res.status(200).json(allStaffs.rows);
    } catch (err) {
        console.error(err.message);
    }

})

router.post('/', async(req, res)=>{
    try {
        const { name, role, email, phone,passcode } = req.body;
        const staff = await pool.query(
        "INSERT INTO staffs(role_id,staff_name, staff_email, phone, passcode) VALUES($1,$2,$3,$4,$5)",
        [role, name, email, phone, passcode]
    );
        const depart = await pool.query(
            "SELECT role_name FROM roles WHERE role_id = $1",
            [role]
        )        
    
    const newStaff = {
        role_name: depart.rows[0].role_name,
        staff_name: req.body.name ,
        staff_email: req.body.email,
        phone: req.body.phone,        
        passcode: req.body.passcode
      }      
      res.status(201).send(newStaff);
        
    } catch (err) {
        console.error(err.message);
    }    

})

router.get('/:id', async(req,res)=>{
    try{
        const { id }= req.params;
        const staff = await pool.query(
            "SELECT * FROM staffs WHERE staff_id= $1",
            [id]
        );
        res.json(staff.rows);

    } catch(err){
        console.error(err.message);
    }
})

router.put('/:id', async(req, res)=>{
    const { id } = req.params;
    const { name, role, email, phone, passcode} = req.body; 
    const staff = await pool.query(
        "UPDATE staffs SET staff_name=$1, role_id=$2, staff_email=$3, phone=$4, passcode=$5 WHERE staff_id=$6 ",
        [name, role, email, phone, passcode, id]
    )
    res.json("the staff is updated.");

})

router.delete('/:id', async(req, res)=>{
    const {id} = req.params;
    const staff = await pool.query(
        "DELETE FROM staffs WHERE staff_id = $1",
        [id]
    );
    res.json("the staff has been deleted.");
})

module.exports = router;