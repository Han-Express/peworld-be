const db = require("../helper/db_connection")

module.exports = {
    get: function(req, res) {
        return new Promise((resolve, reject) => {
            
            const {
                sortby="skill", order="asc", limit=6, page=1
            } = req.query
            const offset = (page - 1) * limit
            const {id} = req.params
            const sql = `
                SELECT * FROM skill
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
                user_id, skill
            } = req.body;

            const sql = `
                INSERT INTO skill(user_id, skill) 
                VALUES ("${user_id}", "${skill}")
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

    update: function(req, res) {
        return new Promise((resolve, reject) => {
            
            const { skill } = req.body;
            const { id } = req.params
            
            const sql = `
                UPDATE skill SET skill="${skill}"
                WHERE skill_id=${id}
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

    remove: function(req, res) {
        return new Promise((resolve, reject) => {
            
            const {id} = req.params
            const {skill} = req.query

            const sql = `
                DELETE FROM skill
                WHERE user_id=${id}
                AND skill="${skill}"
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