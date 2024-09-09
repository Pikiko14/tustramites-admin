import React, { useState } from 'react'

const RoomMessages = ({ room, messages, messagesEndRef }) => {
 
    return (
        <div className="room-messages">
            <ul>
                { messages.map((item, i) => (
        
                    <li className={"burbuje" + (item.owner_id == "ADMIN" ? " me" : " other") } key={i}>
                        <div>
                            { item.content }
                            <span>{ item.owner_id == "CLIENT" ? room.first_name : " Tu experto legal" } - 11:00</span>
                        </div>
                    </li>
                    
                )) }
                <div ref={messagesEndRef} />
            </ul>
        </div>
    )
}

export default RoomMessages
