import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import ActionTable from '../../components/table/ActionTable'
import Alert from '../../helpers/alert/Alert'
//import PolicyForm from './components/PolicyForm.page'


// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const Policy = (props) => {
    const [listPolicies, setListPolicies] = useState([]);

    const columns = [
        {
            title: 'TItulo',
            dataIndex: 'title',
            key: 'title',
            render: text => <a>{text}</a>,
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => props.history.push("/website/pages?id=" + record._id)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];

    const alertShow = (policy) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar esta página?",
            btnOk: "Aceptar",
            fnOk: () => { deletePolicy(policy) },
            btnCancel: "Cancelar",
            fnCancel: () => { }
        })
    }

    const deletePolicy = async (policy) => {

        const response = await HttpClient.delete('/api/page/' + policy._id);
        if (response.status == 200) {
            getPolicies();
        }
    }


    const getPolicies = async () => {
        const response = await HttpClient.get('/api/page');
        if (response.status == 200) {
            setListPolicies(response.data);
        }
    }

    useEffect(() => {
        getPolicies();
    }, [])

    return (
        <>
            <Layout>
                <div className="header-page">
                    <h1>Politicas y tratamientos de datos</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        href={"/website/pages"}
                                    >
                                        Crear Politicas y/o tratamientos

                                    </Button>
                                </li>
                                <li>
                                    <UndoOutlined />
                                </li>
                            </ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listPolicies} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export default Policy
