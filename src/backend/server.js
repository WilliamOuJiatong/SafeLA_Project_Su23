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

app.delete('/userdelete/:UserID', (req, res) => {
    const userId = req.params.UserID;

    const deleteUserQuery = 'DELETE FROM User WHERE UserID = ?';
    db.query(deleteUserQuery, [userId], (err, result) => {
        if (err) {
            console.error(`Failed to delete user with id ${userId}: ${err.message}`);
            return res.status(500).json({ error: "Server error. Failed to delete user." });
        } else {
            return res.status(200).json({ message: "User deleted successfully" });
        }
    });
});
//Favorites add
app.post("/favorites/add", (req, res) => {
    const insertSql = "INSERT INTO Favorites (UserID, Tract, Year, Amount, RateNum) VALUES (?)";
    const values = [req.body.UserID, req.body.Tract, req.body.Year, req.body.Amount, req.body.RateNum];
    db.query(insertSql, [values], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Favorite added successfully' });
    });
});

//Subscription add
app.post("/Subscription/add", (req, res) => {
    const procedureSql = "CALL AddSubscriptionTest(?, ?, ?, ?)";
    const values = [req.body.UserID, req.body.lat, req.body.lng, 1];
    db.query(procedureSql, values, (err, result) => {
        if (err) {
            console.error(err);
            if (err.sqlMessage === "An existing location is too close to the new location") {
                return res.status(400).json({ error: err.sqlMessage });
            }
            return res.status(500).json({ error: 'There was an error processing your request' });
        }
        return res.status(200).json({ message: 'Subscription added successfully' });
    });
});
//Favorites remove
app.delete("/favorites/remove", (req, res) => {
    const deleteSql = "DELETE FROM Favorites WHERE UserID = ? AND Tract = ? AND Year = ? AND Amount = ? AND RateNum = ?";
    const values = [req.body.UserID, req.body.Tract, req.body.Year, req.body.Amount, req.body.RateNum];
    db.query(deleteSql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Favorite removed successfully' });
    });
});

//Subscription remove
app.delete("/Subscription/remove", (req, res) => {
    const deleteSql = "DELETE FROM Subscription WHERE UserID = ? AND LAT = ? AND LON = ?"; 
    const values = [req.body.UserID, req.body.lat, req.body.lng];
    db.query(deleteSql, values, (err, result) => {
        if (err) {
            console.error(err); 
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Subscription removed successfully' });
    });
});

//Subscription upload
app.get('/Subscription/:UserID', (req, res) => {
    const userId = req.params.UserID;
    const query = 'SELECT DISTINCT UserID, LAT, LON FROM Subscription WHERE UserID = ?';
    db.query(query, [userId], (err, data) => {
        if (err) {
            return res.json({ status: "Error", error: err.message });
        }
        return res.json({ status: "Success", data });
    });
});


//Favorites Display of specific user
app.get('/favorites/:UserID', (req, res) => {
    const userId = req.params.UserID;
    const query = 'SELECT DISTINCT Tract, Year, Amount, RateNum FROM Favorites WHERE UserID = ? ORDER BY Amount ASC';
    db.query(query, [userId], (err, data) => {
        if (err) {
            return res.json({ status: "Error", error: err.message });
        }
        return res.json({ status: "Success", data });
    });
});

//Favorites Remove at myfavorite page
app.delete('/favorites/delete/:UserID', (req, res) => {
    const userId = req.params.UserID;
    const { Tract, Year, Amount, RateNum } = req.body;
    const query = 'DELETE FROM Favorites WHERE UserID = ? AND Tract = ? AND Year = ? AND Amount = ? AND RateNum = ?';
    db.query(query, [userId, Tract, Year, Amount, RateNum], (err, result) => {
        if (err) {
            return res.json({ status: "Error", error: err.message });
        }
        return res.json({ status: "Success", message: "Favorite deleted successfully" });
    });
});

//Subscription remove at myfavorite page
app.delete("/Subscription/remove/:UserID", (req, res) => {
    const userId = req.params.UserID;
    const {LAT, LON} = req.body;
    const deleteSql = "DELETE FROM Subscription WHERE UserID = ? AND LAT = ? AND LON = ?"; 
    db.query(deleteSql, [userId, LAT, LON], (err, result) => {
        if (err) {
            return res.json({ status: "Error", error: err.message });
        }
        return res.json({ status: "Success", message: "Subscription removed successfully" });
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

app.get('/rentInfo', (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const sql = 'SELECT r.Row_ID, r.Amount, r.Tract, r.Year, SQRT(POW(r.LAT - ?, 2) + POW(r.LON - ?, 2)) AS Distance, a.AverageAmount FROM Rent_raw r JOIN (SELECT Tract, AVG(Amount) AS AverageAmount FROM Rent_raw GROUP BY Tract ) a ON r.Tract = a.Tract ORDER BY Distance ASC, r.Amount ASC LIMIT 5;';
    db.query(sql, [lat, lon],(err, data) => {
        if (err) {
            return res.json('Error');
        }
        console.log(data);
        return res.json(data);
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