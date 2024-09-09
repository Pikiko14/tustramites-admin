import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import ContactDialog from './components/ContactDialog'
import ActionTable from '../../components/table/ActionTable'
import Alert from '../../helpers/alert/Alert'


// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const Contact = () => {
    const [listContacts, setListContacts] = useState([]);
    const [contactDialog, setContactDialog] = useState();
    const [contact, setContact] = useState();

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
            title: 'Estado',
            dataIndex: 'state',
            key: 'state',
            render: record => <a>{record ? "Atendido" : "Pendiente"}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => handleEditContact(record)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];


    const handleEditContact = (contact) => {
        setContact(contact);
        setContactDialog({ contact });
    }

    const alertShow = (contact) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar esta solicitud de contacto?",
            btnOk: "Aceptar",
            fnOk: () => { deleteContact(contact) },
            btnCancel: "Cancelar",
            fnCancel: () => {}
        })
    }

    const deleteContact = async (contact) => {

        const response = await HttpClient.delete('/api/contact/' + contact._id);
        if (response.status == 200) {
            getContacts();
        }
    }

    const callbackContact = () => {
        getContacts();
        setContactDialog(null);
    }

    const getContacts = async () => {
        const response = await HttpClient.get('/api/contact');
        if (response.status == 200) {
            setListContacts(response.data);
        }
    }

    useEffect(() => {
        getContacts();
    }, [])

    return (
        <>
            <ContactDialog
                contact={contact}
                data={contactDialog}
                setData={setContactDialog}
                callback={callbackContact}
            />
            <Layout>
                <div className="header-page">
                    <h1>Solicitudes de contacto</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul></ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listContacts} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export default Contact
