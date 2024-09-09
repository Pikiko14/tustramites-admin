import React, { useEffect, useState } from 'react'


import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import CallmeDialog from './components/CallmeDialog'
import ActionTable from '../../components/table/ActionTable'
import Alert from '../../helpers/alert/Alert'


const Callme = () => {
    const [listCallme, setListCallme] = useState([]);
    const [callmeDialog, setCallmeDialog] = useState();
    const [callme, setCallme] = useState();

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
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
            title: 'Horario',
            dataIndex: 'schedule',
            key: 'schedule',
            render: text => <a>{text}</a>,
        },
        {
            title: '¿Empresarial?',
            dataIndex: 'message',
            key: 'message',
            render: record => <a>{record.includes('Solicitud de contacto trámite empresarial') ? "Si" : "No"}</a>,
        },
        {
            title: 'Estado',
            dataIndex: 'state',
            key: 'state',
            render: record => <a>{record ? "Finalizado" : "Pendiente"}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => handleEditCallme(record)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];


    const handleEditCallme = (callme) => {
        setCallme(callme);
        setCallmeDialog({ callme });
    }

    const alertShow = (callme) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar esta solicitud de llamado?",
            btnOk: "Aceptar",
            fnOk: () => { deleteCallme(callme) },
            btnCancel: "Cancelar",
            fnCancel: () => { }
        })
    }

    const deleteCallme = async (callme) => {

        const response = await HttpClient.delete('/api/callme/' + callme._id);
        if (response.status == 200) {
            getCallsme();
        }
    }

    const callbackCallme = () => {
        getCallsme();
        setCallmeDialog(null);
    }

    const getCallsme = async () => {
        const response = await HttpClient.get('/api/callme');
        if (response.status == 200) {
            setListCallme(response.data);
        }
    }

    useEffect(() => {
        getCallsme();
    }, [])

    return (
        <>
            <CallmeDialog
                callme={callme}
                data={callmeDialog}
                setData={setCallmeDialog}
                callback={callbackCallme}
            />
            <Layout>
                <div className="header-page">
                    <h1>Solicitudes de llamada</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul></ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listCallme} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export default Callme
