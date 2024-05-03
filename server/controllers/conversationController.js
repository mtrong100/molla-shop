import Conversation from "../models/conversationModel.js";

export const getConversation = async (req, res) => {
  const userRole = req.user.role;

  try {
    if (userRole !== "admin") {
      return res.status(403).json({ error: "Not have permission" });
    }

    const conversation = await Conversation.find().populate({
      path: "participants",
      select: "name avatar _id",
    });

    if (!conversation) {
      res.status(404).json("Conversation not found!");
    }

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};
