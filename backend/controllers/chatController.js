const messageModel = require("../models/messageModel");

exports.getChatHistory = async (req, res) => {
    const { user1, user2 } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const messages = await Message.find({
        $or: [
            { from: user1, to: user2 },
            { from: user2, to: user1 },
        ]
    })
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit);

    return res.status(200).json(messages.reverse());
}
