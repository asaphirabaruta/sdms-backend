const pool = require('../db');
const express = require('express');
const router = express.Router();

router.post('/', async(req,res)=>{
    try {

        const { dc_name }= req.body;
        const newDocCategory = await pool.query(
            "INSERT INTO document_categories(dc_name) VALUES($1) RETURNING *",
            [dc_name]
            );
        res.json(newDocCategory.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

router.get('/', async(req,res)=>{
    try {
        const all_doc_categories= await pool.query(
            "SELECT * FROM document_categories"
        )
        res.json(all_doc_categories.rows); 
        
    } catch (err) {
        console.error(err.message);
    }
})

router.get('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const doc_category = await pool.query(
            "SELECT * FROM document_categories WHERE dc_id=$1",
            [id]);
        res.json(doc_category.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
})

router.put('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const { dc_name } = req.body;
        const updatedCategory = await pool.query(
            "UPDATE document_categories SET dc_name=$1 WHERE dc_id = $2",
            [dc_name, id]
        );
        res.json("Document category was updated.");
    } catch (err) {
        console.error(err.message);
    }
})

router.delete('/:id', async(req,res)=>{
    try {

        const { id }= req.params;
        const deleteCategory= await pool.query(
            "DELETE FROM document_categories WHERE dc_id= $1",
            [id]
        );
        res.json("Document category was deleted.");

    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;