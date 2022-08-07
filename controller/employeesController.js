const Employees = require('../model/Employees')

module.exports = {
    getAllEmployees: async (req, res)=> {
        try {
            const results = await Employees.get(req, res)
            return res.status(200).send(
               
                results
            )
        } catch (error) {
            if (error.status){
                return res.status(error.status).send(error)
            }else {
                return res.status(500).send(error)
            }
        }
    },

    getEmployeesId: async (req, res) => {
        try {
          const results = await Employees.getId(req, res);
          res.status(200).send(results);
        } catch (error) {
            if (error.status){
                return res.status(error.status).send(error)
            }else {
                return res.status(500).send(error)
            }
        }
      },

    addNewEmployees: async (req, res)=> {
        try {
            const results = await Employees.add(req, res)
            return res.status(201).send(results)
        } catch (error) {
            if (error.status){
                return res.status(error.status).send(error)
            }else {
                return res.status(500).send(error)
            }
        }
    },
    updateEmployees: async(req, res) => {
        try {
            const results = await Employees.update(req, res)
            return res.status(201).send(results)
        } catch (error) {
            if (error.status){
                return res.status(error.status).send(error)
            }else {
                return res.status(500).send(error)
            }
        }
    },
    deleteEmployees: async(req, res)=> {
        try {
            const results = await Employees.remove(req, res)
            return res.status(201).send(results)
        } catch (error) {
            if (error.status){
                return res.status(error.status).send(error)
            }else {
                return res.status(500).send(error)
            }
        }
    }
}