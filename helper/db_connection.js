const mysql = require("mysql2");


const db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.host,
    user: process.env.root,
    password: process.env.password,
    database: process.env.database,
    debug: false
})
  


module.exports = db;