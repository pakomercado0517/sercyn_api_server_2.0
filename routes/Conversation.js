const router = require("express").Router();
const conversationController = require("../src/controllers/conversation");

//POST Methods
router.post("/new", conversationController.newConversation);

//GET Methods
router.get("/client/:id", conversationController.getClientConversations);
router.get("/user/:id", conversationController.getUserConversations);

module.exports = router;
