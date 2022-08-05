const User = require("../model/Users.js")

module.exports = {
    getAllUser: async function(req,res) {
         
        try {
            const result = await User.get(req,res)
            return res.send(result)
        } catch(err) {
            res.status(500).send(err)
        }
    },

}