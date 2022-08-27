const db = require("../helper/db_connection");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

module.exports = {
    register: function(req, res) {
        return new Promise((resolve, reject) => {
            const {email, password, name, phone_number} = req.body
            console.log("halo")
            if(!validator.isEmail(email)) {    
                reject({
                    message: "please input valid email",
                    status: 400,
                })
            } else if(password?.length < 10) {
                reject({
                    message: "password too small",
                    status: 400,
                })
            } else if(!validator.isMobilePhone(phone_number, "id-ID")) {
                reject({
                    message: "please input valid phone number",
                    status: 400,
                })
            }
            console.log("hi")

            bcrypt.hash(password, 10,(err, hash) => {
                const sql = `INSERT INTO users(email, password, name, phone_number, role) 
                VALUES('${email}', '${hash}', '${name}', '${phone_number}', 'employee')`
                
                db.query(sql, (err, result) => {
                    if(err) {
                        if(err.code === "ER_DUP_ENTRY") {
                            reject({
                                message: "email cannot be same",
                                status: 400,
                            })    
                        }
                        reject({
                            message: "server is ERROR",
                            status: 500,
                            error: err
                        })
                    } else {

                        db.query('INSERT INTO employees(user_id) VALUES(LAST_INSERT_ID())', (err, result) => {
                            if(err) {
                                reject({
                                    message: "server is ERROR",
                                    status: 500,
                                    error: err
                                })
                            } else {
                                resolve({
                                    message: "Register Succes",
                                    status: 200,
                                    data: result
                                })
                            }
                        }) 
                       
                    }
                })
            } )
            
        })
    },

    registerCompany: function(req, res) {
        return new Promise((resolve, reject) => {
            const {email, password, name, phone_number, company_name, sector} = req.body
            console.log("halo")
            if(!validator.isEmail(email)) {    
                reject({
                    message: "please input valid email",
                    status: 400,
                })
            } else if(password?.length < 10) {
                reject({
                    message: "password length must be atleast 10",
                    status: 400,
                })
            } else if(!validator.isMobilePhone(phone_number, "id-ID")) {
                reject({
                    message: "please input valid phone number",
                    status: 400,
                })
            }
            console.log("hi")

            bcrypt.hash(password, 10,(err, hash) => {
                const sql = `INSERT INTO users(email, password, name, phone_number, role) 
                VALUES('${email}', '${hash}', '${name}', '${phone_number}', 'recruiter')`
                
                db.query(sql, (err, result) => {
                    if(err) {
                        if(err.code === "ER_DUP_ENTRY") {
                            reject({
                                message: "email cannot be same",
                                status: 400,
                            })    
                        }
                        reject({
                            message: "server is ERROR",
                            status: 500,
                            error: err
                        })
                    } else {

                        db.query(`INSERT INTO companies(user_id, company_name, sector) VALUES(LAST_INSERT_ID(), '${company_name}', '${sector}')`, (err, result) => {
                            if(err) {
                                reject({
                                    message: "server is ERROR",
                                    status: 500,
                                    error: err
                                })
                            } else {
                                resolve({
                                    message: "Register Success",
                                    status: 200,
                                    data: result
                                })
                            }
                        }) 
                       
                    }
                })
            } )
            
        })
    },

    login: function(req, res) {
        return new Promise((resolve, reject)=> {
            const {email, password} = req.body;

            const sql = `SELECT user_id, role, password FROM users WHERE email = '${email.toLowerCase()}'`
            db.query(sql, (err, result) => {
               if(err) {
                reject({
                    message: "server is ERROR",
                    status: 500,
                    error: err
                })
               } else if(result.length === 0) {
                reject({
                    message: "email/password Salah",
                    status: 500,
                    error: err
                })
               } else {
                bcrypt.compare(password, result[0].password, (err, pwd) => {
                    if(err) {
                        reject({
                            message: "server is ERROR",
                            status: 500,
                            error: err
                        })  
                    } else if(pwd) {
                        resolve({
                            message: "Login Success",
                            status: 200,
                            data: {
                                token: jwt.sign({
                                    userId: result[0].user_id,
                                    role: result[0].role
                                }, process.env.PRIVATE_KEY, {expiresIn: "1d"}),
                                userId: result[0].user_id,
                                role: result[0].role
                            } 
                        })
                    } else {
                        reject({
                            message: "email/password Salah",
                            status: 500,
                            error: err
                        })
                    }
                }) 

               }
            })
           
        })
    }
}