import React from 'react'
import { Drawer } from 'antd'

import DrawerMenu from './DrawerMenu'

const DrawerMobile = ({ openDrawer, setOpenDrawer }) => {

    const onClose = () => {
        setOpenDrawer(false);
    };


    return (
        <Drawer
            placement={'left'}
            closable={false}
            onClose={onClose}
            visible={openDrawer}
            key={'right'}
        >
            <DrawerMenu />
        </Drawer>
    )
}

export default DrawerMobile
