const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.headers['x-student-token'];
    if(!token) return res.status(401).send("Access denied. No token provided.");
    
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);  
        req.student = decoded;
        next();      
    } catch (ex) {
        res.status(400).send("Invalid token.")
    }
    
}

   