const db = require("../helper/db_connection")

module.exports = {
    getConversations: function(req, res) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM conversations WHERE receiver_id = ${req.params.id} OR sender_id = ${req.params.id} `;
            db.query(sql, (err, results) => {
                if(err) {
                    reject({
                        message: 'Server Error',
                        status: 500,
                        detail: err 
                    })
                } else if(results.length === 0) {
                    resolve({
                        message: 'data is empty',
                        status: 200,
                        data: []
                    })
                } else {
                    resolve({
                        message: 'success',
                        status: 200,
                        data: results
                    })
                }
            })
        })
    },
    addConversation: function(req, res) {
        return new Promise((resolve, reject) => {
            const {receiver_id, sender_id} = req.body
            const sql = `INSERT INTO conversations(receiver_id, sender_id) 
            VALUES ('${receiver_id}', '${sender_id}') `;
            db.query(sql, (err, results) => {
                if(err) {
                    reject({
                        message: 'Server Error',
                        status: 500,
                        detail: err 
                    })
                } else if(results.length === 0) {
                    resolve({
                        message: 'data is empty',
                        status: 200,
                        data: []
                    })
                } else {
                    resolve({
                        message: 'success',
                        status: 200,
                        data: results
                    })
                }
            })
        })
    },
    addMessage: function(req, res) {
        return new Promise((resolve, reject) => {
            const {conversation_id, sender_id, text} = req.body
            const sql = `INSERT INTO messages(conversation_id, sender_id, text) 
            VALUES ('${conversation_id}', '${sender_id}', '${text}') `;
            db.query(sql, (err, results) => {
                if(err) {
                    reject({
                        message: 'Server Error',
                        status: 500,
                        detail: err 
                    })
                } else if(results.length === 0) {
                    resolve({
                        message: 'data is empty',
                        status: 200,
                        data: []
                    })
                } else {
                    resolve({
                        message: 'success',
                        status: 200,
                        data: results
                    })
                }
            })
        })
    },
    getMessages: function(req, res) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM messages WHERE conversation_id = ${req.params.id}`;
            db.query(sql, (err, results) => {
                if(err) {
                    reject({
                        message: 'Server Error',
                        status: 500,
                        detail: err 
                    })
                } else if(results.length === 0) {
                    resolve({
                        message: 'data is empty',
                        status: 200,
                        data: []
                    })
                } else {
                    resolve({
                        message: 'success',
                        status: 200,
                        data: results
                    })
                }
            })
        })
    }
}