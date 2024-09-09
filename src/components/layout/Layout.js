import React from 'react'

import Header from './components/Header'
import DrawerMenu from './components/menu/DrawerMenu'
import Loader from '../loader/Loader'

const Layout = ({ children, loader = false }) => {
    return (
        <>
        { loader && (
            <Loader type="loader"/>
        ) }

        <div className="layout">
            <DrawerMenu />
            <div className="layout-content">
                <Header />
                <main>
                    { children }
                </main>
            </div>
        </div>
        </>
    )
}

export default Layout
