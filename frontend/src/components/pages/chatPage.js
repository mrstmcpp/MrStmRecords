import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { socketURL } from "../../utils/config/backendUrl";
import TextInput from "../shared/TextInput";
import Layout from "../../layouts/Layout"
import { Icon } from "@iconify/react/dist/iconify.js";

const socket = io(socketURL, { autoConnect: false });

const ChatPage = ({ userId }) => {
    const { toUser: receiverId } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const chatBoxRef = useRef(null);



    useEffect(() => {
        if (!socket.connected) socket.connect();

        socket.on("connect", () => {
            socket.emit("join", userId);
            console.log("Connected as:", userId);
        });

        socket.on("receive-message", ({ from, message }) => {
            const sender = from === userId ? 'me' : 'other';
            setMessages((prev) => [...prev, { sender, text: message }]);
        });


        // Load initial chat history
        fetch(`/api/v1/chat/${userId}/${receiverId}`)
            .then(res => res.json())
            .then(data => {
                setMessages(data.map(m => ({
                    sender: m.from === userId ? 'me' : 'other',
                    text: m.message
                })));
            });

        return () => {
            socket.off("receive-message");
            socket.off("connect");
            socket.disconnect();
        };
    }, [userId, receiverId]);

    // Scroll to bottom when messages update
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (message.trim()) {
            const newMsg = { sender: 'me', text: message };
            setMessages((prev) => [...prev, newMsg]);

            socket.emit("send-message", {
                from: userId,
                to: receiverId,
                message,
            });

            setMessage('');
        }
    };

    return (
        <Layout>


            <div className="max-w-2xl mx-auto bg-gray-900 p-4 rounded-lg shadow-md h-[500px] flex flex-col">
                {/* Chat messages */}
                <div
                    ref={chatBoxRef}
                    className="flex-1 overflow-y-auto space-y-2 mb-4"
                >
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`w-fit max-w-[70%] px-4 py-2 rounded-lg text-white ${msg.sender === 'me'
                                ? 'bg-blue-600 ml-auto text-right'
                                : 'bg-green-600 mr-auto text-left'
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="flex flex-row justify-between items-end">
                    <TextInput
                        placeholder={"Type a message"}
                        value={message}
                        setValue={setMessage}
                        label={""}
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
                    >
                        <Icon icon="material-symbols:send-outline-rounded" width="24" height="24" />
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default ChatPage;
