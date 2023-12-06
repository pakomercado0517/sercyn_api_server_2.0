const router = require("express").Router();
const messageController = require("../src/controllers/message");

//POST Methods
router.post("/new", messageController.newMessage);

//GET Methods
router.get("/:conversationId", messageController.getConversationMessages);
router.get("/unreaded/:conversationId", messageController.getMessagesUnreaded);
router.get("/readed/:conversationId", messageController.getMessagesReaded);

//PUT Methods
router.put("/changeToRead/:id", messageController.updateMessageToReaded);

module.exports = router;
