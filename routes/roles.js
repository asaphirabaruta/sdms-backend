const pool = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    try {
        const roles = await pool.query(
            "SELECT * FROM roles"
        )
        res.status(200).json(roles.rows);
        
    } catch (err) {
        console.error(err.message);
    }   
})

router.post('/', async(req, res)=>{
    try {
        const {name}= req.body;
        const role = await pool.query(
            "INSERT INTO roles(role_name) VALUES($1)",
            [name]
        )
        res.status(201).json("the role was added!");

    } catch (err) {
        console.error(err.message);
    }

})

router.get('/:id', async(req,res)=>{
    const {id} = req.params;
    const role = await pool.query(
        "SELECT * FROM roles WHERE role_id = $1",
        [id]
    )
    res.json(role.rows[0]);
})

router.put('/:id', async(req, res)=>{
    const {id} = req.params;
    const {name} = req.body;
    const role = await pool.query(
        "UPDATE roles SET role_name = $1 WHERE role_id= $2",
        [name, id]
    )

    res.json("The role was update.");

})

router.delete('/:id', async(req, res)=>{
    const {id} = req.params;
    const role = await pool.query(
        "DELETE FROM roles WHERE role_id= $1",
        [id]
    )
    res.json("The role was deleted");
})

module.exports = router;