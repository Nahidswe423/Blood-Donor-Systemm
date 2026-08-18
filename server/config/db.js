const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blood_donor_db"
});

db.connect((err) => {
    if (err) {
        console.log("MySQL Connection Error:", err.message);
        return;
    }

    console.log("MySQL Connected");
});

module.exports = db;