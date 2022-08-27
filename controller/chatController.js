const Chat = require("../model/Chat")

module.exports = {
    getCoversations: async function(req, res) {
        try{
            const result = await Chat.getConversations(req, res)
            return res.send(result)
        } catch(err) {
            res.status(err.status ? err.status : 500).send(err)
        }
    },
    addConversation: async function(req, res) {
        try{
            const result = await Chat.addConversation(req, res)
            return res.send(result)
        } catch(err) {
            res.status(err.status ? err.status : 500).send(err)
        }
    },

    getMessages: async function(req, res) {
        try{
            const result = await Chat.getMessages(req, res)
            return res.send(result)
        } catch(err) {
            res.status(err.status ? err.status : 500).send(err)
        }
    },
    addMessage: async function(req, res) {
        try{
            const result = await Chat.addMessage(req, res)
            return res.send(result)
        } catch(err) {
            res.status(err.status ? err.status : 500).send(err)
        }
    },
}