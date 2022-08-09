const Alter = require("../model/Alter")

module.exports = {
    setNull: async function(req, res) {
        try {
            result = await Alter.setNull(req,res)
            return res.send(result)
        } catch (err) {
            err.status ? res.status(err.status).send(err)
            : res.status(500).send({
                message: "Server Error",
                status: 500
            })
        }
    },
    
}