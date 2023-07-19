const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// const { check, validationResult } = require('express-validator');


const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: '34.123.55.32',
    user: 'root',
    password: 'lazy',
    database: 'proj_rent_crime'
})
function haversineDistance(lat1, lon1, lat2, lon2) {
    function toRad(x) {
        return x * Math.PI / 180;
    }
    var R = 6371;
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}
app.post('/signup', (req, res) => {
    const countSql = 'SELECT COUNT(*) as count FROM User';
    db.query(countSql, (err, data) => {
        if (err) {
            return res.json('Error');
        }
        const userID = data[0].count + 1;  // get count from result and add 1
        const insertSql =
            'INSERT INTO User (UserID, UnderName, Password, Email) VALUES (?)';
        const values = [userID, req.body.name, req.body.password, req.body.email]
        db.query(insertSql, [values], (err, result) => {
            if (err) {
                return res.json('Error');
            }
            return res.json(result);
        })
    })
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM User WHERE Email = ? AND Password = ?';
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json({ status: 'Error' });
        }
        if (data.length > 0) {
            return res.json({
                status: 'Success',
                user: {
                    UserID: data[0].UserID,
                    UserName: data[0].UnderName,
                    Password: data[0].Password,
                    Email: data[0].Email
                }
            });
        } else {
            return res.json({ status: 'Fail' });
        }
    })
})

app.put('/useredit', (req, res) => {
    const sql = "UPDATE User SET UnderName = ?, Email = ?, Password = ? WHERE UserID = ?"
    db.query(sql, [req.body.UserName, req.body.Email, req.body.Password, req.body.UserID], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: "Error" });
        }
        return res.json({ status: "Success" })
    });
});

app.get('/crimeData', (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const sql = 'SELECT * FROM LocationCrimeNum';
    db.query(sql, [lat, lon, lat], (err, data) => {
        if (err) {
            return res.json('Error');
        }
        let closestLocation = data[0];
        let minDistance = haversineDistance(lat, lon, data[0].LAT, data[0].LON);
        for (let i = 1; i < data.length; i++) {
            let distance = haversineDistance(lat, lon, data[i].LAT, data[i].LON);
            if (distance < minDistance) {
                minDistance = distance;
                closestLocation = data[i];
            }
        }
        return res.json(closestLocation);
    })
})


// app.post('/login',[    check('email', "Emaill length
// error").isEmail().isLength({min: 10, max:30}),    check('password', "password
// length 8-10").isLength({min: 8, max: 10})], (req, res) => {    const sql =
// "SELECT * FROM login WHERE email = ? AND password = ?";    db.query(sql,
// [req.body.email,req.body.password ], (err, data) => {
//         const errors = validationResult(req);        if(!errors.isEmpty()) {
//         return res.json(errors);        } else {            if(err) { return
//         res.json("Error");            }            if(data.length > 0) {
//         return res.json("Success");            } else {                return
//         res.json("Faile");            }        }            })})
app.listen(8081, () => {
    console.log('listening');
})