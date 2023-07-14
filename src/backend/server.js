const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

// const { check, validationResult } = require('express-validator');


const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({    
    host: "34.123.55.32",    
    user: "root",    
    password: "lazy",    
    database: "proj_rent_crime"}
)
app.post('/signup', (req, res) => {   
    const countSql = "SELECT COUNT(*) as count FROM User";
    db.query(countSql, (err, data) => {
        if(err) {            
            return res.json("Error");        
        }  
        const userID = data[0].count + 1; // get count from result and add 1
        const insertSql = "INSERT INTO User (UserID, UnderName, Password, Email) VALUES (?)";    
        const values = [userID, req.body.name, req.body.password, req.body.email]   
        db.query(insertSql, [values], (err, result) => {        
            if(err) {            
                return res.json("Error");        
            }        
            return res.json(result);    
        })
    })   
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM User WHERE Email = ? AND Password = ?";
    db.query(sql, [req.body.email,req.body.password ], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Fail");
        }
    })
})

// app.post('/login',[    check('email', "Emaill length error").isEmail().isLength({min: 10, max:30}),    check('password', "password length 8-10").isLength({min: 8, max: 10})], (req, res) => {    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";    db.query(sql, [req.body.email,req.body.password ], (err, data) => {
//         const errors = validationResult(req);        if(!errors.isEmpty()) {            return res.json(errors);        } else {            if(err) {                return res.json("Error");            }            if(data.length > 0) {                return res.json("Success");            } else {                return res.json("Faile");            }        }            })})
app.listen(8081, ()=> {   
    console.log("listening");
})