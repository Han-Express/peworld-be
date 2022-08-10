const db = require("../helper/db_connection")

module.exports = {
    setNull: function(req, res) {
        const {table, column} = req.body
        return new Promise((resolve, reject) => {
            const sql = `ALTER TABLE ${table} 
                MODIFY COLUMN ${column} varchar(225) NULL
            `
           db.query(sql ,(err, result) => {
                if(err) {
                    reject({
                        message: "server is ERROR",
                        status: 500,
                        error: err
                    }) 
                } else {
                    resolve({
                        message: success,
                        status: 200
                    })
                }
           })
    })
    },
    
}