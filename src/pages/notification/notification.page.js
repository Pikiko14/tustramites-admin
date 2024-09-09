import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import NotificationDialog from './component/NotificationDialog'
import ActionTable from '../../components/table/ActionTable'
import Alert from '../../helpers/alert/Alert'


// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const Notification = () => {
    const [listDatas, setListDatas] = useState([]);
    const [dataDialog, setDataDialog] = useState();
    const [data, setData] = useState();

    const columns = [
        {
            title: 'Titulo',
            dataIndex: 'title',
            key: 'title',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Fecha',
            dataIndex: 'created_at',
            key: 'created_at',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Asignado a',
            dataIndex: '_to_complete',
            key: '_to_complete',
            render: record => <a>{record && record.first_name && record.last_name
                ? record.first_name + ' ' + record.last_name
                : 'Sin asignar'}</a>
        },
        {
            title: 'Estado',
            dataIndex: 'view',
            key: 'view',
            render: record => <a>{record ? 'Leído' : 'No leído'}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    //handleEdit={() => handleEditData(record)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];


    const handleNewData = () => {
        setData(null);
        setDataDialog({});
    }

    const handleEditData = (notification) => {
        setData(notification);
        setDataDialog({ notification });
    }

    const alertShow = (input) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar este registro?",
            btnOk: "Aceptar",
            fnOk: () => { deleteData(input) },
            btnCancel: "Cancelar",
            fnCancel: () => { }
        })
    }

    const deleteData = async (notification) => {

        const response = await HttpClient.delete('/api/notification-new/' + notification._id);
        if (response.status == 200) {
            getDatas();
        }
    }

    const callbackData = () => {
        getDatas();
        setDataDialog(null);
    }

    const getDatas = async () => {
        let notifications = []
        let users = []
        const response = await HttpClient.get('/api/notification-new/all?type=1');
        if (response.status == 200) {
            notifications = [...response.data];
        }
        const responseUsers = await HttpClient.get('/api/user');
        if (responseUsers.status == 200) {
            users = [...responseUsers.data]
        }
        if (notifications.length > 0) {
            notifications.map(item => {
                let user = users.find(user => item._to === user._id)
                item["_to_complete"] = user
            })
        }
        setListDatas(notifications)
    }

    useEffect(() => {
        getDatas();
    }, [])

    return (
        <>
            <NotificationDialog
                notification={data}
                data={dataDialog}
                setData={setDataDialog}
                callback={callbackData}
            />
            <Layout>
                <div className="header-page">
                    <h1>Notificaciones</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        onClick={() => handleNewData()}
                                    >
                                        Crear notificación
                                    </Button>
                                </li>
                                <li>
                                    <UndoOutlined />
                                </li>
                            </ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listDatas} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export default Notification
