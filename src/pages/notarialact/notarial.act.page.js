import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import ActionTable from '../../components/table/ActionTable'
import Alert from '../../helpers/alert/Alert'

// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const NotarialActPage = (props) => {

    const [listNotarialActs, setListNotarialActs] = useState([]);

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'contact',
            render: (text, record) => <a>{record.category && record.category.name}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            //render: text => <a>{text}</a>,
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => props.history.push("/notarial-act/form?id=" + record._id)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];

    const alertShow = (notarialAct) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar este acto notarial?",
            btnOk: "Aceptar",
            fnOk: () => { deleteNotarialAct(notarialAct) },
            btnCancel: "Cancelar",
            fnCancel: () => { }
        })
    }

    const deleteNotarialAct = async (notarialAct) => {

        const response = await HttpClient.delete('/api/notarialact/' + notarialAct._id);

        if (response.status == 200) {
            getNotarialActs();
        }
    }


    const getNotarialActs = async () => {
        const response = await HttpClient.get('/api/notarialact');
        if (response.status == 200) {
            setListNotarialActs(response.data);
        }
    }


    useEffect(() => {
        getNotarialActs();
    }, [])

    return (
        <>
            <Layout>
                <div className="header-page">
                    <h1>Actos Notariales</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        href={"/notarial-act/form"}
                                    >
                                        Crear Acto Notarial
                                    </Button>
                                </li>
                                <li>
                                    <UndoOutlined />
                                </li>
                            </ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listNotarialActs} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default NotarialActPage