const express = require("express");
const chatController = require("../controller/chatController");
const router = express.Router();

router.get("/conversations/:id", chatController.getCoversations);
router.post("/conversations", chatController.addConversation);
router.get("/messages/:id", chatController.getMessages);
router.post('/messages', chatController.addMessage)

module.exports = router