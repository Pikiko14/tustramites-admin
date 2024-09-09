import React, { useEffect, useState, useContext } from 'react'
import { Button, Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// CONTEXT 
import AuthContext from '../../context/AuthContext';



// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import UserDialog from './components/UserDialog'
import ActionTable from '../../components/table/ActionTable'
import Alert from '../../helpers/alert/Alert'




// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

// COOKIE
import Cookies from "universal-cookie";
const cookies = new Cookies();

const User = () => {
    const [listUsers, setListUsers] = useState([]);
    const [userDialog, setUserDialog] = useState();
    const [userS, setUser] = useState();
    const { user } = useContext(AuthContext);

    const columns = [
        {
            title: 'Nombre(s)',
            dataIndex: 'first_name',
            key: 'first_name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Apellidos',
            dataIndex: 'last_name',
            key: 'last_name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => handleEditUser(record)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];

    const handleNewUser = () => {
        setUser(null);
        setUserDialog({});
    }

    const handleEditUser = (user) => {
        setUser(user);
        setUserDialog({ user });
    }

    const alertShow = (users) => {
        if (users._id === user.id) {
            Alert.show({
                type: "error",
                title: "Error",
                message: "No se puede eliminar el usuario, que tiene una sesión activa",
                btnOk: "Aceptar",
                fnOk: () => { },
                btnCancel: "Cancelar"
            })
        } else {
            Alert.show({
                type: "warning",
                title: "Confirmación",
                message: "¿Seguro desea eliminar este usuario?",
                btnOk: "Aceptar",
                fnOk: () => { deleteUser(users) },
                btnCancel: "Cancelar",
                fnCancel: () => { }
            })
        }
    }

    const deleteUser = async (user) => {

        const response = await HttpClient.delete('/api/user/' + user._id);
        if (response.status == 200) {
            getUsers();
        }
    }

    const callbackUser = (id) => {
        if (id && id === user.id) {
            Alert.show({
                type: "success",
                title: "Información",
                message: "Actualizo la sesión actual, por tal motivo debe volver a iniciar sesión",
                btnOk: "Aceptar",
                fnOk: () => { logout() },
                btnCancel: "Cancelar"
            })

        } else {
            getUsers();
            setUserDialog(null);
        }
    }

    const logout = () => {
        cookies.remove('token');
        window.location.href = "/login";
    }

    const getUsers = async () => {
        const response = await HttpClient.get('/api/user');
        if (response.status == 200) {
            setListUsers(response.data);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <>
            <UserDialog
                user={userS}
                data={userDialog}
                setData={setUserDialog}
                callback={callbackUser}
            />
            <Layout>
                <div className="header-page">
                    <h1>Usuarios</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        onClick={() => handleNewUser()}
                                    >
                                        Crear Usuario
                                    </Button>
                                </li>
                                <li>
                                    <UndoOutlined />
                                </li>
                            </ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listUsers} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export default User
