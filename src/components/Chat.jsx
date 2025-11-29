import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {

    const { targetUserId } = useParams();
    // console.log(targetUserId);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const user = useSelector(store => store.user);
    const userId = user?._id;

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
            withCredentials: true
        })
        // console.log(chat.data.messages);
        const chatMessages = chat?.data?.messages.map(msg => {

            const { senderId, text, createdAt } = msg;

            return {
                firstName: senderId?.firstName,
                lastName: senderId?.lastName,
                text,
                createdAt
            }
        })
        setMessages(chatMessages)
    }

    useEffect(() => {
        fetchChatMessages();
    }, [])

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocketConnection();      //It is an object

        //As soon as the page loaded the socket connection is made and joinChat event is emitted
        socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId, createdAt: user.createdAt })  //same name of the event as that in backend

        socket.on("messageReceived", ({ firstName, lastName, text }) => {
            console.log(firstName + " " + text);
            setMessages((messages) => [...messages, { firstName, lastName, text }])
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId])

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId, targetUserId,
            text: newMessage
        })
        setNewMessage("")
    }



    const formatToIST = (utcDate) => {
        if (!utcDate) return "";
        const date = new Date(utcDate);
        return date.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: true,   // AM/PM format
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };


    const scrollContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className='w-[350px] md:w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col mt-28 rounded-lg'>
            <h1 className='p-5 border-b border-gray-600 font-bold text-xl'>Chat</h1>
            <div className='flex-1 overflow-scroll p-5' ref={scrollContainerRef} 
            style={{ backgroundImage: `linear-gradient(rgba(0,0,255,26%), rgba(75,0,0,49%)),
                    url("https://static.whatsapp.net/rsrc.php/v4/yq/r/MHVytaGe3gh.png")`}}>
                {messages.map((msg, index) => {
                    return (
                        <div key={index} className={"chat " +
                            (user.firstName === msg.firstName ? "chat-end" : "chat-start")
                        }>
                            <div className="chat-header font-bold">
                                {`${msg.firstName} ${msg.lastName}`}
                                <time className="text-xs opacity-50">{formatToIST(msg.createdAt)}</time>
                            </div>
                            <div className={"text-white chat-bubble " + (user.firstName === msg.firstName ? "bg-green-900" : "chat-bubble-neutral")}>{msg.text}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    );
                })}
            </div>
            <div className='p-1 md:p-5 border-t border-gray-600 flex items-center gap-2'>
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault(); // prevent newline if using textarea
                            sendMessage();
                        }
                    }}
                    className='flex-1 border border-gray-500 text-white rounded p-2'></input>
                <button onClick={sendMessage} className='btn btn-secondary'>Send</button>
            </div>
        </div>
    )
}

export default Chat