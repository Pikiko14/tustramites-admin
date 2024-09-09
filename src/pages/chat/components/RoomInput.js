import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';

import {
    SendOutlined
} from '@ant-design/icons'

const RoomInput = ({ socket, room }) => {

    const [form] = Form.useForm();

    const sendMessage = (value) => {
        if(value.message != '' && value.message) {
            socket.emit('MESSAGE', room.room,  "ADMIN", value.message);
            form.resetFields()
        }
        
    }

    return (
        <div className="room-input">
            <Form 
                layout="vertical"
                form={form}
                onFinish={sendMessage}>

                <Form.Item
                    name="message"
                    id="message"
                >
                    <Input placeholder="Escribe un mensaje" type="text" autoComplete="off"/>
                </Form.Item>

                <Button htmlType="submit"><SendOutlined/></Button>
            </Form>
        </div>
    )
}

export default RoomInput