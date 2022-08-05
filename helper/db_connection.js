const mysql = require("mysql");
require('dotenv').config()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "han-peworld"
  })
  
  db.connect((err)=> {
    if (err) {
      console.log(err)
    }
  
    console.log("db connected")
})

module.exports = db;