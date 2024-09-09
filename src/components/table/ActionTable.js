import React from 'react'
import { Space } from 'antd'

// ICON
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons'

const ActionTable = ({ handleEdit, handleDelete }) => {
    return (
        <Space size="middle">
            {handleEdit ?
                <a className="action-edit" onClick={handleEdit}>
                    <EditOutlined />
                </a> : null}
            {handleDelete ?

                <a className="action-delete" onClick={handleDelete}>
                    <DeleteOutlined />
                </a> : null}
        </Space>
    )
}

export default ActionTable
