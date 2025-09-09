import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';

const Chat = () => {

    const { targetUserId } = useParams();
    console.log(targetUserId);
    const [messages, setMessages] = useState([{ text: "Hello from PUBG" }]);
    const user=useSelector(store=>store.user);
    const userId=user?._id;

    useEffect(()=>{
        const socket=createSocketConnection();      //It is an object
        
        //As soon as the page loaded the socket connection is made and joinChat event is emitted
        socket.emit("joinChat",{userId, targetUserId})  //same name of the event as that in backend
        return ()=>{
            socket.disconnect();
        }
    },[])

    return (
        <div className='w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
            <h1 className='p-5 border-b border-gray-600'>Chat</h1>
            <div className='flex-1 overflow-scroll p-5'>
                {messages.map((msg, index) => {
                    return (
                        <div key={index} className="chat chat-start">
                            <div className="chat-header">
                                Deepanker Tiwari
                                <time className="text-xs opacity-50">2 hour ago</time>
                            </div>
                            <div className="chat-bubble">WebSockets Code Here!.</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    );
                })}
            </div>
            <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
                <input className='flex-1 border border-gray-500 text-white rounded p-2'></input>
                <button className='btn btn-secondary'>Send</button>
            </div>
        </div>
    )
}

export default Chat