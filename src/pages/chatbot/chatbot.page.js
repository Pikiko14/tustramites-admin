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

const ChatbotPage = (props) => {

    const [chatbots, setChatbots] = useState([]);

    const columns = [
        {
            title: 'Número',
            dataIndex: 'key',
            key: 'key',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Titulo',
            dataIndex: 'title',
            key: 'title',
            render: text => <a>{text}</a>,
        },
        {
            title: '¿Chat en Whatsapp?',
            dataIndex: 'whatsapp',
            key: 'whatsapp',
            render: record => <a>{record ? "Si" : "No"}</a>,
        },
        {
            title: 'Estado',
            dataIndex: 'state',
            key: 'state',
            render: record => <a>{record ? "Activo" : "Inactivo"}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => props.history.push("/chatbot/form?id=" + record._id)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];

    const alertShow = (chatbot) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar esta opción del chatbot?",
            btnOk: "Aceptar",
            fnOk: () => { deleteChatbot(chatbot) },
            btnCancel: "Cancelar",
            fnCancel: () => { }
        })
    }

    const deleteChatbot = async (chatbot) => {

        const response = await HttpClient.delete('/api/chatbot/' + chatbot._id);

        if (response.status == 200) {
            getChatbots();
        }
    }


    const getChatbots = async () => {
        const response = await HttpClient.get('/api/chatbot');
        if (response.status == 200) {
            setChatbots(response.data);
        }
    }


    useEffect(() => {
        getChatbots()
    }, [])

    return (
        <>
            <Layout>
                <div className="header-page">
                    <h1>Chatbot</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        href={"/chatbot/form"}
                                    >
                                        Crear nueva opción
                                    </Button>
                                </li>
                                <li>
                                    <UndoOutlined />
                                </li>
                            </ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={chatbots} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ChatbotPage