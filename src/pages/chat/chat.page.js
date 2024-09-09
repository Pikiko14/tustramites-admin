import React, { useEffect, useState, useRef } from 'react'


import HttpClient from '../../helpers/network/HttpClient'
import io from 'socket.io-client'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import RoomHeader from './components/RoomHeader'
import RoomInput from './components/RoomInput'
import RoomList from './components/RoomList'
import RoomMessages from './components/RoomMessages'

import {
    WechatOutlined
} from '@ant-design/icons'




const ChatPage = () => {


    const messagesEndRef = useRef(null);
    const [room, setRoom] = useState()
    const [rooms, setRooms] = useState([])
    const [messages, setMessages] = useState([])

    const socket = io(process.env.REACT_APP_URL_API);

    socket.emit("ROOM_JOIN", "ADMIN");

    socket.on('ROOM_LIST', (data) => {
        setRooms([...rooms, data]);
    })

    socket.on('NEW_MESSAGE', (data) => {

        const listRoom = [...rooms] || [];

        listRoom.forEach((item, i) => {
            if (item.room == data.room) {
                let listMessage = data.messages;
                item["message"] = listMessage;
                listRoom[i] = data;
                setRooms(listRoom);
                setMessages(listRoom[i].message || []);
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
        })

    })


    const getRooms = async () => {
        const response = await HttpClient.get('/api/chat');

        if (response.status == 200) {
            if (response.data.length > 0) {
                console.log(response.data);
                setRooms(response.data);
                setRoom(response.data[0]);
                setMessages(response.data[0].message);
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }

        }
    }

    const changeRoom = (element) => {
        setRoom(element);
        setMessages(element.message);
    }


    useEffect(() => {
        getRooms();
    }, [])


    return (
        <Layout>
            <div className="header-page">
                <h1>Solicitudes de chat</h1>

                {rooms.length > 0 ? (
                    <div className="chat card">
                        <RoomList
                            rooms={rooms}
                            setRoom={changeRoom}
                        />

                        {room && (
                            <div className="room">
                                <RoomHeader room={room} />
                                <RoomMessages room={room} messages={messages} messagesEndRef={messagesEndRef} />
                                <RoomInput socket={socket} room={room} messages={messages} setMessages={setMessages} />
                            </div>
                        )}

                    </div>
                ) : (
                    <div className="chat card">
                        <div className="chat-empty">
                            <WechatOutlined />
                            <h2>No Hay solicitudes de chat</h2>
                        </div>
                    </div>
                )}

            </div>
        </Layout>
    )
}

export default ChatPage
