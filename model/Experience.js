const db = require('../helper/db_connection')


module.exports = {
    get:(req,res) =>{
        return new Promise((resolve,reject) => {
            const sql =`SELECT experience.company_name, position, entry_date, date_out, description, users.name, email, image FROM experience join users on experience.user_id=users.user_id`
            db.query(sql,(err, results)=> {
                if(err) {
                    reject({
                      message: err,
                      status : 500
                    })
                  }

                  resolve({
                    message: "get all from experience success",
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
          const sql = `SELECT experience.company_name, position, entry_date, date_out, description FROM experience  WHERE user_id =${id}`;
          db.query(sql, (err, results) => {
            if (err) {
              console.log(err)
              reject({
                message: err,
                status : 500
              });
            }
            resolve({
              message: "Get all from experience success",
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
        const {user_id, company_name, position, entry_date, date_out, description} = req.body
        
        // console.log(req.body, 'reaqqqq')
        db.query(`INSERT INTO experience(user_id, company_name, position, entry_date, date_out, description) VALUES( ${user_id}, '${company_name}', '${position}', '${entry_date}','${date_out}','${description}')`,(err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "add new experience success",
            status: 200,
            data: {
              // id: results.insertId,
              ...req.body,
            }
          })
        })
      })
    },
    update: (req, res) => {
        return new Promise((resolve, reject)=> {
          const {id} = req.params
          console.log
          db.query(`SELECT * FROM experience WHERE user_id = ${id}`,(err, results)=> {

            if(err) {res.send({
              
              message: err,
              status : 500
            })}
        
            const previousData = {
              ...results[0],
              ...req.body
            }
            const {company_name, position, entry_date, date_out, description } = previousData
            // console.log(phone_number, 'haalo')
       
             
              db.query(`UPDATE experience SET  company_name='${company_name}', position='${position}', entry_date='${entry_date}', date_out='${date_out}', description='${description}' WHERE user_id=${id}`,(err, results)=> {
                if(err) {
                  console.log(err)
                  reject({
                    message: err,
                    status: 500
                  })
                }
                resolve({
                  message: "update experience success",
                  status: 200,
                  data: results
                })
              })
            
            
        
          })
        })
      },
    
}