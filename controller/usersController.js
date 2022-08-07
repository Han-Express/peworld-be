const Users = require("../model/Users.js")

module.exports = {
    getAllUsers: async function(req,res) {
         
        try {
            const result = await Users.get(req,res)
            return res.status(200).send({
                result,
                message: 'succes'
            })
        } catch(err) {
            return res.status(500).send(err)
        }
    },

    getUsersId: async (req, res) => {
        try {
          const results = await Users.getId(req, res);
          res.status(200).send(results);
        } catch (error) {
          res.send(error);
        }
      },

    addNewUsers: async (req, res)=> {
        console.log(req.file, 'filename dari upload')
        try {
            console.log({...req.body, image: 'oke'})
            const reqModifer = {
                ...req,
                body: { ...req.body, image: req.file.filename }
            }
            const results = await Users
            .add(reqModifer, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },

    updateUsers: async(req, res) => {
        try {
            if(req.file){
                reqModifer = {
                    ...req,
                    body: { ...req.body, image: req.file.filename }
                } 
            } else {
                reqModifer = {
                    ...req,
                    body: { ...req.body}
                }
            }
            const results = await Users
            .update(reqModifer, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },

}