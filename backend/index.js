const express = require("express");
require('dotenv').config();
const app = express();
const http = require("http");
const { Connection } = require("./database/db");
const PassPortModule = require("./passport");
const trackRoutes = require("./routes/trackRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const passport = require("passport");
const cors = require("cors");
const genreRoute = require("./routes/genreRoute");
const artistRoutes = require("./routes/artistRoutes");
const accountRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes")
const albumRoutes = require("./routes/albumRoutes");
const port = process.env.PORT || 5500;
const { Server } = require("socket.io");
const redisClient = require('./utils/redis');
const messageModel = require("./models/messageModel");
const session = require('express-session');
const messageRoutes = require("./routes/messageRoutes");


app.use(cors());
app.use(express.json());
// app.use(passport.session());
app.use(passport.initialize());
PassPortModule();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
    autoConnect: false,
})

io.on("connection", (socket) => {
    socket.on('register', async (userId) => {
        if (userId && typeof userId === 'object' && userId.id) {
            userId = userId.id;
        }

        if (typeof userId !== 'string') {
            console.error('Invalid userId:', userId);
            return;
        }
        await redisClient.set(`user:${userId}`, socket.id);
        await redisClient.set(`socket:${socket.id}`, userId);
        console.log(`Mapped user : ${userId} <-> socket:${socket.id}`);
    })

    socket.on('private_message', async ({ to, message, from }) => {
        await messageModel.create({ from, to, message });

        const receiverSocketId = await redisClient.get(`user:${to}`);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('private_message', {
                message,
                from,
            });
        }
    });

    socket.on('disconnect', async () => {
        const userId = await redisClient.get(`socket:${socket.id}`);
        if (userId) {
            await redisClient.del(`user:${userId}`);
            await redisClient.del(`socket:${socket.id}`);
            console.log(`Removed mappings for user:${userId}`);
        }
    });
})

app.get("/api/v1/", (req, res) => {
    res.send("Welcome to the server");
})




const apiVersion = "/api/v1";

app.use(`${apiVersion}/track`, trackRoutes);
app.use(`${apiVersion}/playlist`, playlistRoutes);
app.use(`${apiVersion}/genre`, genreRoute);
app.use(`${apiVersion}/artist`, artistRoutes);
app.use(`${apiVersion}/user`, accountRoutes);
app.use(`${apiVersion}/admin`, adminRoutes);
app.use(`${apiVersion}/album`, albumRoutes);
app.use(`${apiVersion}/messages`, messageRoutes);


Connection();



server.listen(port, () => {
    console.log("App is running on port " + port);
})

