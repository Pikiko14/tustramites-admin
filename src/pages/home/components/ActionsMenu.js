import React from 'react'
import { Dropdown, Menu } from 'antd'

// ICON
import {
    MoreOutlined
} from '@ant-design/icons'

const ActionsMenu = () => {
    
    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Importar de Excel
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Exportar a Excel
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomRight">
            <MoreOutlined />
        </Dropdown>
    )
}

export default ActionsMenu
