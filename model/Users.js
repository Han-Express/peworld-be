const db = require("../helper/db_connection.js")
const fs = require('fs');

module.exports = {
    get: function (req,res){
        return new Promise((resolve,reject) => {
            db.query(`SELECT * FROM users` , (err,result) => {
                if(err){
                    reject({
                        message: "ERROR, Server is down",
                        status: "500"
                    })
                }

                resolve({
                    message: "Berhasil",
                    status: 200,
                    data: result
                })   
            })
        })
    },

    getId: (req, res) => { // get done
        return new Promise((resolve, reject) => {
            const {user_id} = req.params;
            console.log(user_id)
          const sql = `SELECT * FROM users WHERE user_id =${user_id}`;
          db.query(sql, (err, results) => {
            if (err) {
              console.log(err)
              reject({
                message: "Something wrong",
              });
            }
            resolve({
              message: "Get all from users success",
              status: 200,
              data: results
              // data:{results,
              //   ...req.body
              // }
              
            });
          });
        });
      },


    add: (req, res)=> {
        return new Promise((resolve, reject)=> {
          const {name, email, password, role, phone_number, image } = req.body
  
          db.query(`INSERT INTO employees(name, email, password, role, phone_number, image) VALUES('${name}', '${email}','${password}', '${role}','${phone_number}','${image})`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "error"})
            }
            resolve({
              message: "add new users success",
              status: 200,
              data: {
                id: results.insertId,
                ...req.body,
              }
            })
          })
        })
      },

      update: (req, res) => {
        return new Promise((resolve, reject)=> {
          const {user_id} = req.params
          db.query(`SELECT * FROM users WHERE user_id=${user_id}`,(err, results)=> {
            // console.log(results)
            // console.log(req.file)
            if(err) {res.send({message: "ada error"})}
            if(req.file){
              fs.unlink(`./uploads/${results[0].image}`, function (err) {
                if (err) resolve({
                  message: "update users error",
                  status: 200,
                  data: results
                });
                resolve({
                  message: "update users success",
                  status: 200,
                  data: results
                });
              });
            }
            
            const previousData = {
              ...results[0],
              ...req.body
            }
            // console.log(previousData)
            const {name, email, password, role, phone_number, image} = previousData
  
            // const date = moment(password).format('YYYY-MM-DD')
        
            db.query(`UPDATE users SET name='${name}', email='${email}', password='${password}', role='${role}', phone_number='${phone_number}, image='${image}' WHERE user_id='${user_id}'`,(err, results)=> {
              if(err) {
                console.log(err)
                reject({message: "ada error"})
              }
              resolve({
                message: "update users success",
                status: 200,
                data: results
              })
            })
        
          })
        })
      },

}