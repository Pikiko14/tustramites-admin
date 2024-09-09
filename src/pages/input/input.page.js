import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import InputDialog from './component/InputDialog'
import ActionTable from '../../components/table/ActionTable'
import Alert from '../../helpers/alert/Alert'


// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const Input = () => {
    const [listInputs, setListInputs] = useState([]);
    const [inputDialog, setInputDialog] = useState();
    const [input, setInput] = useState();

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
            render: text => <a>{setTypeSpanish(text)}</a>,
        },
        {
            title: 'Requerido',
            dataIndex: 'required',
            key: 'required',
            render: text => <a>{text===true?'Si':'No'}</a>,
        },
        {
            title: 'Min. Caracteres',
            dataIndex: 'minCant',
            key: 'minCant',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Max. Caracteres',
            dataIndex: 'maxCant',
            key: 'maxCant',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Persona Juridica',
            dataIndex: 'validation',
            key: 'validation',
            render: text => <a>{text===true?'Si':'No'}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => handleEditInput(record)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];

    const setTypeSpanish = (data) => {

        switch (data) {

            case "text":
                data = "texto"
                break;
            case "string":
                data = "cadena"
                break;
            case "number":
                data = "número"
                break;
            case "date":
                data = "fecha"
                break;
            case "list":
                data = "lista"
                break;
            case "file":
                data = "archivo"
                break;
            case "email":
                data = "correo"
                break;

        }

        return data;
    }

    const handleNewInput = () => {
        setInput(null);
        setInputDialog({});
    }

    const handleEditInput = (input) => {
        setInput(input);
        setInputDialog({ input });
    }

    const alertShow = (input) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar este banner?",
            btnOk: "Aceptar",
            fnOk: () => { deleteInput(input) },
            btnCancel: "Cancelar",
            fnCancel: () => { }
        })
    }

    const deleteInput = async (input) => {

        const response = await HttpClient.delete('/api/input/' + input._id);
        if (response.status == 200) {
            getInputs();
        }
    }

    const callbackInput = () => {
        getInputs();
        setInputDialog(null);
    }

    const getInputs = async () => {
        const response = await HttpClient.get('/api/input');
        if (response.status == 200) {
            setListInputs(response.data);
        }
    }

    useEffect(() => {
        getInputs();
    }, [])

    return (
        <>
            <InputDialog
                input={input}
                data={inputDialog}
                setData={setInputDialog}
                callback={callbackInput}
            />
            <Layout>
                <div className="header-page">
                    <h1>Campos Formulario</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        onClick={() => handleNewInput()}
                                    >
                                        Crear Campo
                                    </Button>
                                </li>
                                <li>
                                    <UndoOutlined />
                                </li>
                            </ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listInputs} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export default Input
