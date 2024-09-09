import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import AditionalDialog from './component/AditionalDialog'
import ActionTable from '../../components/table/ActionTable'
import Alert from '../../helpers/alert/Alert'


// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const AditionalConfig = () => {
    const [listDatas, setListDatas] = useState([]);
    const [dataDialog, setDataDialog] = useState();
    const [data, setData] = useState();

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Valor',
            dataIndex: 'value',
            key: 'value',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => handleEditData(record)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];

    
    const handleNewData = () => {
        setData(null);
        setDataDialog({});
    }

    const handleEditData = (input) => {
        setData(input);
        setDataDialog({ input });
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

    const deleteData= async (input) => {

        const response = await HttpClient.delete('/api/aditional/' + input._id);
        if (response.status == 200) {
            getDatas();
        }
    }

    const callbackData = () => {
        getDatas();
        setDataDialog(null);
    }

    const getDatas = async () => {
        const response = await HttpClient.get('/api/aditional');
        if (response.status == 200) {
            setListDatas(response.data);
        }
    }

    useEffect(() => {
        getDatas();
    }, [])

    return (
        <>
            <AditionalDialog
                aditional={data}
                data={dataDialog}
                setData={setDataDialog}
                callback={callbackData}
            />
            <Layout>
                <div className="header-page">
                    <h1>Información Adicional</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        onClick={() => handleNewData()}
                                    >
                                        Crear registro
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


export default AditionalConfig
