const { User, Client, Message, Conversation } = require("../db");

module.exports = {
  newMessage: async (req, res, next) => {
    const { userId, clientId, text, sender, readed, receiverEmail } = req.body;
    let conversation;
    try {
      const user = await User.findOne({ where: { id: userId } });
      const client = await Client.findOne({ where: { id: clientId } });
      conversation = await Conversation.findOne({
        where: { UserId: userId, ClientId: clientId },
      });
      if (!conversation) {
        conversation = await Conversation.create();
        await conversation.setUser(user);
        await conversation.setClient(client);
      }
      const message = await Message.create({
        text,
        sender,
        readed,
        userId,
        clientId,
        receiverEmail,
      });
      await conversation.addMessage(message);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getConversationMessages: async (req, res, next) => {
    const { conversationId } = req.params;
    try {
      const messages = await Message.findAll({
        where: { ConversationId: conversationId },
      });

      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
      next(error);
    }
  },
  getMessagesUnreaded: async (req, res, next) => {
    const { conversationId } = req.params;
    try {
      const messages = await Message.findAll({
        where: { ConversationId: conversationId, readed: false },
      });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
      next(error);
    }
  },
  getMessagesReaded: async (req, res, next) => {
    const { conversationId } = req.params;
    try {
      const messages = await Message.findAll({
        where: { ConversationId: conversationId, readed: true },
      });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
      next(error);
    }
  },
  updateMessageToReaded: async (req, res, next) => {
    const { id } = req.params;
    try {
      const message = await Message.findOne({ where: { id } });
      if (message) {
        message.update({ readed: true });
      }
      res.status(200).json({ message: "message change to readed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
      next(error);
    }
  },
};
