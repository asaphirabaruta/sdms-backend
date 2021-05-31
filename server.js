require('dotenv').config();
const express = require('express');
const cors = require('cors');
const doc_category= require('./routes/doc_categories');
const students = require ('./routes/students');
const roles = require('./routes/roles');
const staffs = require('./routes/staffs');
const documents = require('./routes/documents');
const academic_year = require('./routes/academic_year');
const studentAuth = require('./routes/studentAuth');
const staffAuth = require('./routes/staffAuth');

const app = express();
const port = process.env.PORT || 3001;

if(!process.env.JWTPRIVATEKEY) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1)
}


app.use(cors());
app.use(express.json());
app.use('/documents', express.static('documents'));
app.use('/api/docCategory', doc_category);
app.use('/api/students', students);
app.use('/api/roles', roles);
app.use('/api/staffs', staffs);
app.use('/api/documents', documents);
app.use('/api/academic_year', academic_year);
app.use('/api/studentAuth', studentAuth);
app.use('/api/staffAuth', staffAuth);

app.listen(port, ()=>{
    console.log(`This app is running on port ${port}`);
});

// Network@ur2019