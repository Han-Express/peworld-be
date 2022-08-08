const db = require("../helper/db_connection")
const fs = require("fs");
const validator = require("validator")

module.exports = {

    getId: function(req, res) {
        return new Promise((resolve, reject) => {
            const {id} = req.params
            const sql = `
            SELECT users.user_id, users.email, users.phone_number,
            users.image, company_name, sector , domicile,
            description, instagram, linked_in   
            FROM companies
            JOIN users
            On companies.user_id = users.user_id
            WHERE users.user_id = ${id}
            `
            db.query(sql,(err, result) => {

                if(err) {
                    reject({
                        message: "server is ERROR",
                        status: 500,
                        error: err
                    })
                } else if(result.length === 0) {
                    reject({
                        message: "there is no such user",
                        status: 400,
                    })
                } else {
                    resolve({
                        message: "Success",
                        status: 200,
                        data: result
                    })
                }
            })
        })
    },

    update: function(req, res) {
        return new Promise((resolve, reject) => {
            
            const {id} = req.params
            const sql = `
            SELECT users.user_id, users.email, users.phone_number,
            users.image, company_name, sector , domicile,
            description, instagram, linked_in   
            FROM companies
            JOIN users
            On companies.user_id = users.user_id
            WHERE users.user_id = ${id}
            `
            db.query(sql,(err, result) => {


                if(err) {
                    reject({
                        message: "server is ERROR",
                        status: 500,
                        error: err
                    })
                } else if(result.length === 0) {
                    reject({
                        message: "there is no such user",
                        status: 400,
                    })
                } else {
                    if(result[0].image) {
                        fs.unlink(`./${process.env.FILE_PATH}/${result[0].image}`, (err,result)=> {})
                    }
                    const oldData = {
                        ...result[0],
                        ...req.body
                    } 
                    
                    let {
                        email, phone_number,
                        company_name, sector, 
                        domicile, description,
                        instagram, linked_in,
                        image
                    } = oldData

                    if(req.file) {
                        image = req.file.filename
                    } 

                    if(!validator.isEmail(email)) {    
                        reject({
                            message: "please input valid email",
                            status: 400,
                        })
                    } else if(!validator.isMobilePhone(phone_number, "id-ID")) {
                        reject({
                            message: "please input valid phone number",
                            status: 400,
                        })
                    } else {

                        const sql = `
                        UPDATE companies, users SET users.email ="${email}",
                        users.phone_number ="${phone_number}", users.image="${image}",
                        company_name = "${company_name}", 
                        sector ="${sector}", domicile="${domicile}", 
                        description="${description}", instagram="${instagram}", 
                        linked_in="${linked_in}"
                        WHERE companies.user_id = users.user_id AND 
                        companies.user_id = ${id} AND users.user_id = ${id}
                        `
                        db.query(sql,(err, result) => {

                            if(err) {
                                fs.unlink(`./${process.env.FILE_PATH}/${req.file.filename}`, (err,result)=> {})
                                reject({
                                    message: "server is ERROR",
                                    status: 500,
                                    error: err
                                })
                            } else if(result.length === 0) {
                                reject({
                                    message: "there is no such user",
                                    status: 400,
                                })
                            }  else {
                                resolve({
                                    message: "Success",
                                    status: 200,
                                    data: result
                                })
                            }
                        })
                    }
                    
                    
                }
            })
            
        })
    },
}