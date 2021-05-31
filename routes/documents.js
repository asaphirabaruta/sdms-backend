const pool = require('../db');
const fs = require('fs');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const studentAuth = require('../middleware/studentAuth');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        
        cb(null, './documents');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb)=> {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf')
    cb(null, true);
    else 
    cb(null,false);
}

const uploads = multer({storage: storage, fileFilter: fileFilter});

router.get('/', async(req, res)=>{ 
    try {
        const documents = await pool.query(
            "SELECT * FROM documents"
        );
        res.send(documents.rows)        
    } catch (err) {
        console.error(err.message);
    }     
    // res.json(req.student.reg);
})

router.post('/', studentAuth, uploads.single('document'), async(req, res)=>{
    // console.log(req.file);
    const {dc_id, desc} = req.body;
    const reg = req.student.reg;
    const path = req.file.path;
    if (dc_id == 5){
        const deleted = await pool.query(
            "DELETE FROM documents WHERE dc_id = $1 and reg_number= $2",
            [5, reg]
        );                 

    } 
    
    const document = await pool.query(
        "INSERT INTO documents(dc_id, reg_number, doc_path, description) VALUES($1,$2,$3,$4)",
        [dc_id, reg, path, desc]
    );
    const docType = await pool.query(
        "SELECT dc_name from document_categories WHERE dc_id =$1",
        [dc_id]
    );
    const doc_id = await pool.query(
        "SELECT doc_id from documents WHERE doc_path = $1",
        [path]
    )       
    const newDoc = {
        dc_name: docType.rows[0].dc_name,
        reg_number: reg,
        description: desc,
        uploaded_date: new Date(),
        doc_path: path,
        doc_id: doc_id.rows[0].doc_id             
    }
    console.log(newDoc);
    res.send(newDoc);

})

router.get('/me',studentAuth, async(req,res)=>{
    try{
        const reg = req.student.reg;
        const documents = await pool.query(
            "SELECT documents.*, document_categories.dc_name FROM documents INNER JOIN document_categories ON documents.dc_id= document_categories.dc_id WHERE reg_number= $1 ORDER BY doc_id DESC",
            [reg]
        );
        res.send(documents.rows);

    } catch(err){
        console.error(err.message);
    }

})

router.get('/myPassport', studentAuth, async(req,res)=>{
    try {
        const reg = req.student.reg;
        let passport = await pool.query(
            "SELECT * FROM documents WHERE reg_number=$1 and dc_id=$2",
            [reg, 5]
        )
        res.send(passport.rows[0].doc_path);
    } catch (err) {
        console.error(err.message);
    }
})

router.get('/:id',studentAuth,async(req,res)=>{
    try {
        
        let doc = await pool.query(
            "SELECT * FROM documents WHERE doc_id=$1",
            [req.params.id]
        )
        // res.send(doc.rows[0].doc_path);
        // const file = fs.createReadStream("./documents/Asaph's certificate page.pdf");
        const file = fs.createReadStream(`./${doc.rows[0].doc_path}`);
        file.pipe(res);

    } catch (err) {
        console.error(err.message);
    }
})

router.put('/:id', async(req, res)=>{

})

router.delete('/:id', studentAuth, async(req, res)=>{
    const reg = req.student.reg; 
    const path = await pool.query(
        "SELECT doc_path FROM documents WHERE doc_id=$1",[req.params.id]
    ) 
    const doc_path = path.rows[0].doc_path;
    console.log(doc_path);
    const document = await pool.query(
        "DELETE FROM documents WHERE doc_id=$1",[req.params.id]
    )
    res.json("The document has been deleted."); 
})

module.exports = router;