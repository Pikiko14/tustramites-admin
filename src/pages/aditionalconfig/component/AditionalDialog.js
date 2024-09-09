import React, { useEffect } from 'react'

import HttpClient from '../../../helpers/network/HttpClient'

import { Form, Input, Button, Select, Modal } from 'antd'

const AditionalDialog = ({ aditional, data, setData, callback }) => {

    const [form] = Form.useForm();

    const handleOk = () => {

        if (aditional) {

            HttpClient.put('/api/aditional/' + aditional._id, {
                name: form.getFieldValue('name'),
                type: form.getFieldValue('type'),
                value: form.getFieldValue('value')
            })
                .then((res) => {
                    setData(null);
                    callback();
                })

        } else {

            HttpClient.post('/api/aditional', {
                name: form.getFieldValue('name'),
                type: form.getFieldValue('type'),
                value: form.getFieldValue('value')
            })
                .then((res) => {
                    setData(null);
                    callback();
                })

        }

    }

    const handleCancel = () => {
        setData(null);
    }

    useEffect(() => {
        form.resetFields();
        if (aditional) {
            let data = {
                name: aditional.name,
                type: aditional.type,
                value: aditional.value
            }
            form.setFieldsValue(data);
        }

    }, [aditional, data])

    return (
        <Modal
            visible={data}
            title="Información del registro"
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
                    onClick={handleOk}>
                    Guardar
                </Button>
            ]}
        >
            <Form
                layout="vertical"
                form={form} >

                <Form.Item
                    label="Nombre"
                    name="name"
                    id="name"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el nombre!',
                        },
                        {
                            min: 4,
                            message: 'El nombre debe tener al menos 4 caracteres!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="type"
                    id="type"
                    label="Tipo"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Seleccione un tipo"
                        allowClear
                    >
                        <option value="notification_email">Correo de notificación</option>
                        <option value="phone">Teléfono</option>
                        <option value="whatsapp">Whatsapp</option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Valor"
                    name="value"
                    id="value"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el valor!',
                        }
                    ]}
                >
                    <Input
                        type="string"
                    />
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default AditionalDialog