const UserModel = require("../models/userModel");
const MessageModel = require("../models/messageModel");

exports.getUserForSideBar = async (req, res) => {
    try {
        const loggedId = req.user;
        const filteredUsers = await UserModel.find({ _id: { $ne: loggedId } })
            .select("firstName lastName _id profilePicture")
            .sort({ createdAt: -1 });
        res.status(200).json(filteredUsers);
    } catch (err) {
        console.error("Error in messageController:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


exports.getMessages = async (req, res) => {
    try {
        const { id } = req.params;
        const senderId = req.user;

        const message = await MessageModel.find({
            $or: [
                { from: senderId }, { to: id },
                { from: id }, { to: senderId }
            ]
        });

        if (!message) return res.status(404).json({ error: "Message not found" });
        res.status(200).json(message);
    } catch (err) {
        console.error("Error in messageController:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


exports.sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user;

        const newMessage = new MessageModel({
            from: senderId,
            to: receiverId,
            text,
        });


        await newMessage.save();

        // const receiverSocketId = getReceiverSocketId(receiverId);
        // if (receiverSocketId) {
        //   io.to(receiverSocketId).emit("newMessage", newMessage);
        // }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};