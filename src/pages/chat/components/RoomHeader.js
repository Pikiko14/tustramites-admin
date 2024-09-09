import React from 'react'
import { Avatar, Button } from 'antd';

const RoomHeader = ({ room }) => {
    return (
        <div className="room-header">
            <Avatar size="large">
                {"NO"}
            </Avatar>
            <div className="chat-list-info">
                <h3>{ room.first_name + " " + room.last_name }</h3>
                <p>{"En linea"}</p>
            </div>
        </div>
    )
}

export default RoomHeader
