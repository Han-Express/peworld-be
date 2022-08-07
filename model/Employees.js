const db = require('../helper/db_connection')
const validator = require ('validator')

module.exports = {
  get: (req, res)=> {
    return new Promise((resolve, reject)=> {
      const {job_status, page= 1, limit= 4}=req.query
      const offset = (page -  1)*limit

     
      const sql = `SELECT employees.job, job_status, domicile, instagram, github, gitlab,description, users.name, email, image FROM employees join users on employees.user_id=users.user_id  ${job_status? `WHERE job_status = '${job_status}' ` : ""} limit ${limit} offset ${offset}`
      db.query(sql,(err, results)=> {
        if(err) {
          reject({
            message: err,
            status : 500
          })
        }
        resolve({
          message: "get all from employees success",
          status: 200,
          data: results
        })
      })
    })
  },
   
      getId: (req, res) => { // get done
        return new Promise((resolve, reject) => {
            const {id} = req.params;
            console.log(id)
          const sql = `SELECT employees.job, job_status, domicile, instagram, github, gitlab,description, users.name, email, image FROM  employees join users on employees.user_id=users.user_id WHERE users.user_id =${id}`;
          db.query(sql, (err, results) => {
            if (err) {
              console.log(err)
              reject({
                message: err,
                status : 500
              });
            }
            resolve({
              message: "Get all from employees success",
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
        const {job, job_status, domicile, instagram, github, gitlab, description} = req.body

        // console.log(req.body, 'reaqqqq')
        db.query(`INSERT INTO employees(job, job_status, domicile, instagram, github, gitlab, description) VALUES('${job}', '${job_status}', '${domicile}','${instagram}','${github}','${gitlab}','${description}'`,(err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "add new employees success",
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
          const {id} = req.params
          db.query(`SELECT employees.job, job_status, phone_number, domicile, instagram, github, gitlab,description, users.name, email, image FROM  employees join users on employees.user_id=users.user_id WHERE users.user_id =${id}`,(err, results)=> {
            if(err) {res.send({
              
              message: err,
              status : 500
            })}
        
            const previousData = {
              ...results[0],
              ...req.body
            }
            const {name, email, phone_number, image, job, job_status, domicile, instagram, github, gitlab, description } = previousData
            console.log(phone_number, 'haalo')
            if (!validator.isEmail (email)){

              reject({
                message : "please input valid email",
                status : 400
              })
            }else if(!validator.isMobilePhone(phone_number, "id-ID")){
              reject({
                message : "please input valid phone number",
                status : 400
            })
            }else {
              db.query(`UPDATE employees, users SET users.name='${name}', users.email='${email}',users.phone_number='${phone_number}', users.image='${image}',  job='${job}', job_status='${job_status}', domicile='${domicile}', instagram='${instagram}', github='${github}', gitlab='${gitlab}', description='${description}' WHERE employees.user_id=users.user_id AND employees.user_id=${id} AND users.user_id=${id}`,(err, results)=> {
                if(err) {
                  console.log(err)
                  reject({
                    message: err,
                    status: 500
                  })
                }
                resolve({
                  message: "update employees success",
                  status: 200,
                  data: results
                })
              })
            }
            
        
          })
        })
      },
    
}