import React from 'react'
import { Modal, Button } from 'antd';

const SucursalDialog = ({ visible, setVisible }) => {

    const handleOk = () => {
        setVisible(false);
    }
    
    const handleCancel = () => {
        setVisible(false);
    }

    return (
        <Modal 
            title="Basic Modal" 
            visible={visible} 
            onOk={handleOk} 
            onCancel={handleCancel}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default SucursalDialog
