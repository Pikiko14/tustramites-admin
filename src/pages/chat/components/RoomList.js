import React from 'react'
import { Avatar, Button } from 'antd';

const RoomList = ({ rooms, setRoom }) => {

    const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

    return (
        <div className="room-list">
            <ul>
                {rooms.map((item, i) => (
                    <li
                        key={i}
                        onClick={() => { setRoom(item) }}
                    >
                        <Avatar size="large" style={{ backgroundColor: ColorList[Math.floor(Math.random() * ColorList.length)], verticalAlign: 'middle' }}>
                            {item.first_name.split(" ")[0].substring(0, 2).toUpperCase()}
                        </Avatar>
                        <div className="chat-list-info">
                            <h3>{item.first_name.split(" ")[0] + " " + item.last_name.split(" ")[0]}</h3>
                            <p>{item.message[item.message.length - 1].content}</p>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RoomList
