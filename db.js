const mysql = require("mysql");
const dbConfig = require("./app/config/db.config");

const conn = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

conn.connect();

module.exports = conn;