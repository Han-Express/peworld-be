const mysql = require("mysql");
const fs = require("fs")
const path = require("path")


const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.root,
    password: process.env.password,
    database: process.env.database,
    port: 25060,
  })
  
  db.connect((err)=> {
    if (err) {
      console.log(err)
    }
  
    console.log("db connected")
})

module.exports = db;