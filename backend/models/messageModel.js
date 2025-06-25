const mongo = require('mongoose');

const messageSchema = new mongo.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
});

module.exports = mongo.model('Message', messageSchema)