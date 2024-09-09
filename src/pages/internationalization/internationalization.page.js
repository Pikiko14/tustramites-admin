import React, { useEffect, useState } from 'react'
import { Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import InternationalizationDialog from './components/InternationalizationDialog'
import ActionTable from '../../components/table/ActionTable'


// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const Internationalization = () => {
    const [listInternationalizations, setListInternationalizations] = useState([]);
    const [internationalizationDialog, setInternationalizationDialog] = useState();
    const [internationalization, setInternationalization] = useState();

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Estado',
            dataIndex: 'state',
            key: 'state',
            render: record => <a>{record ? "Si" : "No"}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            //render: text => <a>{text}</a>,
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => handleEditInternationalization(record)}
                />
            ),
        }
    ];

    const handleEditInternationalization = (internationalization) => {
        setInternationalization(internationalization);
        setInternationalizationDialog({ internationalization });
    }

    const callbackInternationalization = () => {
        getInternationalization();
        setInternationalizationDialog(null);
    }

    const getInternationalization = async () => {
        const response = await HttpClient.get('/api/internationalization/admin');
        if (response.status == 200) {
            setListInternationalizations(response.data);
        }
    }

    useEffect(() => {
        getInternationalization();
    }, [])

    return (
        <>
            <InternationalizationDialog
                internationalization={internationalization}
                data={internationalizationDialog}
                setData={setInternationalizationDialog}
                callback={callbackInternationalization}
            />
            <Layout>
                <div className="header-page">
                    <h1>Internacionalización</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul/>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listInternationalizations} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export default Internationalization
