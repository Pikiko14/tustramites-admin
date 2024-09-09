import React, { useState, useEffect } from 'react'
import { InputNumber, Modal } from 'antd';

import HttpClient from '../../../../helpers/network/HttpClient'

import { Form, Input, Button, Select, Checkbox, Space } from 'antd'

import DataTable from '../../../../components/table/DataTable'

const NotarialActDialog = ({ name, category, description, tableAux, listActorsAdd, notarialAct, data, setData, callback }) => {

    const [form] = Form.useForm();
    const [documents, setDocuments] = useState([]);

    const columnsDocument = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Obligatorio',
            dataIndex: 'required',
            key: 'required',
            render: (text, record) => <a>{record.required ? 'Si' : 'No'}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => deleteDocument(record)}>Eliminar</a>
                </Space>
            ),
        }
    ];

    const deleteDocument = (data) => {

        let newArr = [...documents];

        for (let i = 0; i < newArr.length; i++) {

            if (newArr[i].name === data.name) {

                newArr.splice(i, 1);
                setDocuments(newArr);
            }
        }
    }

    const handleAddDocument = () => {

        let newArr = [...documents];
        let data = {
            name: form.getFieldValue('document'),
            required: form.getFieldValue('required')
        }
        newArr.push(data);
        setDocuments(newArr);
        data = { document: '', required: false };
        form.setFieldsValue(data);

    }

    const handleOk = async () => {

        if (documents.length > 0) {

            if (notarialAct) {
                const response = await HttpClient.put('/api/notarialact/' + notarialAct._id, {
                    name: name,
                    category: category._id,
                    description: description,
                    form: tableAux,
                    actors: listActorsAdd,
                    documents: documents,
                    notary: form.getFieldValue('notary'),
                    payment: form.getFieldValue('payment'),
                    document_result: form.getFieldValue('document_result'),
                    date: form.getFieldValue('date'),
                    time_delivery: form.getFieldValue('time_delivery'),
                    duration: form.getFieldValue('duration'),
                });
                if (response.status == 200) {

                    setData(null);
                    callback();
                }
            } else {
                const response = await HttpClient.post('/api/notarialact', {
                    name: name,
                    category: category._id,
                    description: description,
                    form: tableAux,
                    actors: listActorsAdd,
                    documents: documents,
                    notary: form.getFieldValue('notary'),
                    payment: form.getFieldValue('payment'),
                    document_result: form.getFieldValue('document_result'),
                    date: form.getFieldValue('date'),
                    time_delivery: form.getFieldValue('time_delivery'),
                    duration: form.getFieldValue('duration'),
                });
                if (response.status == 201) {
                    setData(null);
                    callback();
                }
            }
        }
    };

    const handleCancel = () => {
        setData(null);
    }

    useEffect(() => {
        form.resetFields();
        if (notarialAct) {
            let data = {
                notary: notarialAct.notary,
                payment: notarialAct.payment,
                document_result: notarialAct.document_result,
                date: notarialAct.date,
                time_delivery: notarialAct.time_delivery,
                duration: notarialAct.duration,
            }
            form.setFieldsValue(data);
            setDocuments(notarialAct.documents);
        }

    }, [notarialAct,data])

    return (
        <Modal
            visible={data}
            title="Información adicional"
            onOk={handleOk}
            onCancel={handleCancel}
            forceRender
            maskClosable={false}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancelar
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    // loading={loading}
                    onClick={handleOk}>
                    Guardar
                </Button>
            ]}
        >
            <Form
                layout="vertical"
                form={form} >

                <Form.Item
                    label="Tiempo de entrega del borrador"
                    name="time_delivery"
                    id="time_delivery"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Duración del tramite"
                    name="duration"
                    id="duration"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese la duración!',
                        },
                        {
                            min: 4,
                            message: 'La duración debe tener al menos 4 caracteres!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Documentos">

                    <Form.Item
                        label="Nombre"
                        name="document"
                        id="document"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese el nombre del documento!',
                            },
                            {
                                min: 5,
                                message: 'El nombre del ducumento, debe tener al menos 5 caracteres!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="required"
                        valuePropName="checked"
                        id="required"
                    >
                        <Checkbox>Obligatorio</Checkbox>
                    </Form.Item>

                    <Button onClick={() => handleAddDocument()}> Agregar</Button>

                </Form.Item>

                <div className="main-card-table">
                    <DataTable columns={columnsDocument} data={documents} />
                </div>


                <Form.Item
                    name="notary"
                    valuePropName="checked"
                    id="notary"
                >
                    <Checkbox>Trámite con notaría</Checkbox>
                </Form.Item>

                <Form.Item
                    label="Entrega borrador"
                    name="document_result"
                    id="document_result"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="payment"
                    valuePropName="checked"
                    id="payment"
                >
                    <Checkbox>Aplica pago en plataforma</Checkbox>
                </Form.Item>

                <Form.Item
                    name="date"
                    valuePropName="checked"
                    id="date"
                >
                    <Checkbox>Requiere cita en notaría</Checkbox>
                </Form.Item>

            </Form>

        </Modal>
    )
}

export default NotarialActDialog