const Experience = require ('../model/Experience')

module.exports = {
    getAllExperience: async (req, res)=> {
        try {
            const results = await Experience.get(req, res)
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

    getExperienceId: async (req, res) => {
        try {
          const results = await Experience.getId(req, res);
          res.status(200).send(results);
        } catch (error) {
            if (error.status){
                return res.status(error.status).send(error)
            }else {
                return res.status(500).send(error)
            }
        }
      },

    addNewExperience: async (req, res)=> {
        try {
            const results = await Experience.add(req, res)
            return res.status(201).send(results)
        } catch (error) {
            if (error.status){
                return res.status(error.status).send(error)
            }else {
                return res.status(500).send(error)
            }
        }
    },
    updateExperience: async(req, res) => {
        try {
            const results = await Experience.update(req, res)
            return res.status(201).send(results)
        } catch (error) {
            if (error.status){
                return res.status(error.status).send(error)
            }else {
                return res.status(500).send(error)
            }
        }
    },
    deleteExperience: async(req, res)=> {
        try {
            const results = await Experience.remove(req, res)
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