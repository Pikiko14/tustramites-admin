import React, { useState, useContext } from 'react'

import DrawerMobile from './menu/DrawerMobile'

// CONTEXT 
import AuthContext from '../../../context/AuthContext';

//COMPONENTS
import UserDialog from '../../../pages/user/components/UserDialog'

// COOKIE
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Header = () => {

    const [openDrawer, setOpenDrawer] = useState(false);
    const { user } = useContext(AuthContext);
    const [userDialog, setUserDialog] = useState();

    const exitLogout = () => {

        cookies.remove('token');
        window.location.href = "/login";

    }
    const handleShowUser = () => {
        setUserDialog({ user });
    }

    const callbackUser = () => {
        setUserDialog(null);
    }

    return (
        <>
            <UserDialog
                user={user}
                data={userDialog}
                setData={callbackUser}
                callback={callbackUser}
            />
            <DrawerMobile openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
            <header>
                <div className="responsive-menu">
                    <img src="/assets/icon/menu.svg" onClick={() => setOpenDrawer(true)} />
                </div>

                <ul>
                    <li>
                        <img src="/assets/icon/notification.svg" />
                    </li>
                    <li>
                        <img src="/assets/icon/settings.svg" onClick={() => exitLogout()} />
                    </li>
                    <li>
                        <img className="profile" src="/assets/icon/user_3.svg" onClick={() => handleShowUser()} />
                    </li>
                </ul>
            </header>
        </>
    )
}

export default Header
