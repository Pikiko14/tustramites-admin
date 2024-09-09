import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import ActionTable from '../../components/table/ActionTable'
import NotaryDialog from './components/NotaryDialog'
import Alert from '../../helpers/alert/Alert'


// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const Notary = (props) => {
    const [listNotaries, setListNotaries] = useState([]);
    //const [notaryDialog, setNotaryDialog] = useState();
    const [notary, setNotary] = useState();

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Contacto',
            dataIndex: 'contact',
            key: 'contact',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Dirección',
            dataIndex: 'address',
            key: 'address',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Teléfono',
            dataIndex: 'phone',
            key: 'phone',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            //render: text => <a>{text}</a>,
            render: (text, record) => (
                <ActionTable 
                    handleEdit={ () => handleEditNotary(record) }
                    handleDelete={ () => alertShow(record) }
                />
            ),
        }
    ];

    const handleNewNotary = () => {
        //setNotary(null);
        //setNotaryDialog({});
        props.history.push("/notarycrud")
    }

    const handleEditNotary = (notary) => {
        /*setNotary(notary);
        setNotaryDialog({notary});*/
        props.history.push("/notarycrud?id=" + notary._id)
    }

    const alertShow = (notary) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar esta notaria?",
            btnOk: "Aceptar",
            fnOk: () => { deleteNotary(notary) },
            btnCancel: "Cancelar",
            fnCancel: () => {  }
        })
    }

    const deleteNotary = async (notary) => {
        
        const response = await HttpClient.delete('/api/notary/'+notary._id);
        if (response.status == 200) {
            getNotaries();
        }
    }

    /*const callbackNotary = () => {
        getNotaries();
        setNotaryDialog(null);
    }*/

    const getNotaries = async () => {
        const response = await HttpClient.get('/api/notary');
        if (response.status == 200) {
            setListNotaries(response.data);
        }
    }

    useEffect(() => {
        getNotaries();
    }, [])

    return (
        <>
            {/*<NotaryDialog
                notary={notary}
                data={notaryDialog}
                setData={setNotaryDialog}
                callback={callbackNotary}
            />*/}
            <Layout>
                <div className="header-page">
                    <h1>Notarias</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        onClick={() => handleNewNotary()}
                                    >
                                        Crear Notaria
                                    </Button>
                                </li>
                                <li>
                                    <UndoOutlined />
                                </li>
                            </ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listNotaries} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export default Notary
