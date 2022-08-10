const db = require("../helper/db_connection");
const fs = require("fs")

module.exports = {
    get: function(req, res) {
        return new Promise((resolve, reject) => {
            
            const {sortby="created_at", order="desc", limit=6, page=1} = req.query
            const offset = (page - 1) * limit
            const {id} = req.params
            const sql = `
                SELECT * FROM portfolio 
                WHERE user_id =${id}
                ORDER BY ${sortby} ${order}
                LIMIT ${limit} OFFSET ${offset}
            `
            db.query(sql, (err,results) => {

                if(err) {
                    reject({
                        message: "Server is Error",
                        status: 500,
                        detail: err
                    })
                } else {
                    resolve({
                        message: "Success",
                        status: 200,
                        data: results
                    })
                    
                }
            })
            
        }) 
    },
    add: function(req, res) {
        return new Promise((resolve, reject) => {
            
            const {
                name, link, user_id
            } = req.body;
            const image = req.file.filename

            const sql = `
                INSERT INTO portfolio(name, link, image, user_id) 
                VALUES ('${name}', '${link}', '${image}', '${user_id}')
            `
            db.query(sql, (err,results) => {

                if(err) {
                    fs.unlink(`./${process.env.FILE_PATH}/${req.file.filename}`, (err,result)=> {})
                    reject({
                        message: "Server is Error",
                        status: 500,
                        detail: err
                    })
                } else {
                    resolve({
                        message: "Success",
                        status: 200,
                        data: results
                    })
                    
                }
            })
            
        }) 
    },
    remove: function(req, res) {
        return new Promise((resolve, reject) => {
            
            const {id} = req.params;
            const {portfolioId} = req.query;
            const sql = `
                DELETE FROM portfolio
                WHERE user_id=${id}
                AND portfolio_id='${portfolioId}'
            `
            db.query(sql, (err,results) => {

                if(err) {
                    reject({
                        message: "Server is Error",
                        status: 500,
                        detail: err
                    })
                } else {
                    resolve({
                        message: "Success",
                        status: 200,
                        data: results
                    })
                    
                }
            })
            
        }) 
    },
}