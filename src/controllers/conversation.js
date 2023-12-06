const { User, Client, Conversation, Company } = require("../db.js");

module.exports = {
  newConversation: async (req, res) => {
    const { userId, clientId } = req.body;
    try {
      const user = await User.findOne({ where: { id: userId } });
      const client = await Client.findOne({ where: { id: clientId } });
      if (!user || !client)
        return res.status(404).json({ message: "User or client not found" });
      const conversation = await Conversation.create();
      await conversation.setUser(user);
      await conversation.setClient(client);
      res
        .status(201)
        .json({ message: "Conversation created", data: conversation });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getClientConversations: async (req, res, next) => {
    const { id } = req.params;
    try {
      const conversations = await Conversation.findAll({
        where: { ClientId: id },
        include: [
          {
            model: User,
            attributes: ["id", "first_name", "email"],
            include: [{ model: Company, attributes: ["logo"] }],
          },
        ],
      });
      res.status(200).json(conversations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUserConversations: async (req, res, next) => {
    const { id } = req.params;
    try {
      const conversations = await Conversation.findAll({
        where: { UserId: id },
      });
      res.status(200).json(conversations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
