const Portfolio = require("../model/Portfolio")
const Skill = require("../model/Skill")

module.exports = {

    getSkill: async function(req, res) {
        try {
            result = await Skill.get(req,res)
            return res.send(result)
        } catch (err) {
            err.status ? res.status(err.status).send(err)
            : res.status(500).send({
                message: "Server Error",
                status: 500
            })
        }
    },
    addSkill: async function(req, res) {
        try {
            result = await Skill.add(req,res)
            return res.send(result)
        } catch (err) {
            err.status ? res.status(err.status).send(err)
            : res.status(500).send({
                message: "Server Error",
                status: 500
            })
        }
    },
    updateSkill: async function(req, res) {
        try {
            result = await Skill.update(req,res)
            return res.send(result)
        } catch (err) {
            err.status ? res.status(err.status).send(err)
            : res.status(500).send({
                message: "Server Error",
                status: 500
            })
        }
    },
    removeSkill: async function(req, res) {
        try {
            result = await Skill.remove(req,res)
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