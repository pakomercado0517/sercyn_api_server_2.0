const { User, Client, Conversation, Message } = require("../db");

module.exports = {
  fetchConversation: async (data) => {
    const user = await User.findOne({ where: { id: data.userId } });
    const client = await Client.findOne({ where: { id: data.clientId } });
    if (!data.conversationId) {
      const conversation = await Conversation.create();
      await conversation.setUser(user);
      await conversation.setClient(client);
      return conversation;
    }
    const conversation = await Conversation.findOne({
      where: { id: data.conversationId },
    });
    return conversation;
  },
  fetchMessages: async (data) => {
    console.log("data.conversation", data);
    const conversationMessages = await Message.findAll({
      where: { ConversationId: data },
    });
    return conversationMessages;
  },
};
