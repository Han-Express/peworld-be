const db = require('../helper/db_connection')
const validator = require ('validator')
const fs = require("fs")

module.exports = {
  get: (req, res)=> {
    return new Promise((resolve, reject)=> {
      const {job_status, page= 1, limit= 4, skill}=req.query
      const offset = (page -  1)*limit

     
      const sql = `
      SELECT users.user_id, users.phone_number,
      employees.job, job_status, 
      domicile, instagram, github, gitlab,
      description, users.name,
      email, image, GROUP_CONCAT(skill.skill) as skill
      FROM employees 
      JOIN users 
      on employees.user_id=users.user_id
      JOIN skill
      ON employees.user_id = skill.user_id
      WHERE skill.skill LIKE '%${skill}%' 
      ${job_status? `AND job_status = '${job_status}' ` : ""}
      GROUP BY users.user_id
      LIMIT ${limit} OFFSET ${offset}`
      db.query(sql,(err, results1)=> {

        if(err) {
          reject({
            message: "server is error",
            status : 500,
            detail: err
          })
        }

        const skill = results1[0]?.skill.split(",")
        const data = {
          ...results1[0],
          skill
        } 

        const sql = `SELECT users.user_id, users.phone_number,
        employees.job, job_status, 
        domicile, instagram, github, gitlab,
        description, users.name,
        email, image
        FROM employees 
        JOIN users 
        on employees.user_id=users.user_id
        JOIN skill
        ON employees.user_id = skill.user_id
        WHERE skill.skill LIKE '%${skill}%' 
        ${job_status? `WHERE job_status = '${job_status}' ` : ""}
        GROUP BY users.user_id`
        db.query(sql, (err, results2) => {
          
          if(err) {
            reject({
              message: "server is error",
              status : 500,
              detail: err
            })
          }

          const totalData = results2?.length;
          const totalPage = Math.ceil(totalData / limit) 
          resolve({
            message: "get all from employees success",
            status: 200,
            data: data,
            totalPage: totalPage,
            totalData: totalData 
          })

        })
       
      })
    })
  },
   
      getId: (req, res) => { // get done
        return new Promise((resolve, reject) => {
            const {id} = req.params;
            console.log(id)
          const sql = `SELECT employees.job, job_status, domicile, instagram, github, gitlab,description, users.name, email, image, users.phone_number FROM  employees join users on employees.user_id=users.user_id WHERE users.user_id =${id}`;
          db.query(sql, (err, results) => {
            if (err) {
              console.log(err)
              reject({
                message: err,
                status : 500
              });
            }
            resolve({
              message: "Get employees success",
              status: 200,
              data: results
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
          db.query(`SELECT employees.job, job_status, 
          phone_number, domicile, instagram, github, 
          gitlab,description, users.name, email, image 
          FROM  employees join users on employees.user_id=users.user_id WHERE users.user_id =${id}`,(err, results)=> {
          
            if(err) {
              reject({
              message: "server is error",
              status : 500,
              detail: err
            })}

            if(results[0].length === 0) {
              reject({
                message: "data not found",
                status : 400,
                data: []
              })
            }

            if(req.file) {
              fs.unlink(`./${process.env.FILE_PATH}/${results[0].image}`, (err,result)=> {})
            }
        
            const previousData = {
              ...results[0],
              ...req.body
            }

            console.log(req.body)

            let { 
              name, email, phone_number, image, job,
               job_status, domicile, instagram, github,
              gitlab, description } = previousData
            
            if(req.file) {
              image = req.file.filename
            }
           
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
                    message: "server is error",
                    status: 500,
                    detail: err
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