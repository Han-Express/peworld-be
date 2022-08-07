const Portfolio = require("../model/Portfolio")

module.exports = {

    getPortfolio: async function(req, res) {
        try {
            result = await Portfolio.get(req,res)
            return res.send(result)
        } catch (err) {
            err.status ? res.status(err.status).send(err)
            : res.status(500).send({
                message: "Server Error",
                status: 500
            })
        }
    },
    addPortfolio: async function(req, res) {
        try {
            result = await Portfolio.add(req,res)
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