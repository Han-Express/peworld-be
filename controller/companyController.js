const Company = require("../model/Company")

module.exports = {
    getCompanyId: async function(req, res) {
        try {
            result = await Company.getId(req,res)
            return res.send(result)
        } catch (err) {
            err.status ? res.status(err.status).send(err)
            : res.status(500).send({
                message: "Server Error",
                status: 500
            })
        }
    },
    updateCompany: async function(req, res) {
        try {
            result = await Company.update(req,res)
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