import React, { useState, useEffect } from 'react'
import { InputNumber, Modal } from 'antd';

import HttpClient from '../../../helpers/network/HttpClient'

import { Form, Input, Button, Select, Checkbox } from 'antd'

const ContactDialog = ({ contact, data, setData, callback }) => {

    const [form] = Form.useForm();
    const { TextArea } = Input;

    const handleOk = () => {


        HttpClient.put('/api/contact/' + contact._id, {
            name: form.getFieldValue('name'),
            email: form.getFieldValue('email'),
            phone: form.getFieldValue('phone'),
            message: form.getFieldValue('message'),
            state: form.getFieldValue('state'),
        })
            .then((res) => {
                setData(null);
                callback();
            })



    }

    const handleCancel = () => {
        setData(null);
    }


    useEffect(() => {
        form.resetFields();
        if (contact) {
            let data = {
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                message: contact.message,
                state: contact.state
            }
            form.setFieldsValue(data);
        }

    }, [contact, data])

    return (
        <Modal
            visible={data}
            title="Información de la solicitud"
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
                    <Input
                        disabled={true} />
                </Form.Item>

                <Form.Item
                    label="Correo"
                    name="email"
                    id="email"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: 'El valor ingresado no es un correo eléctronico!',
                        },
                    ]}
                >
                    <Input
                        disabled={true} />
                </Form.Item>

                <Form.Item
                    label="Teléfono"
                    name="phone"
                    id="phone"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el número teléfono!',
                        },
                    ]}
                >
                    <InputNumber
                        disabled={true} />
                </Form.Item>

                <Form.Item
                    label="Mensaje"
                    name="message"
                    id="message"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            type: "message",
                            message: 'El mensaje no ha sido ingresado!',
                        },
                    ]}
                >
                    <TextArea
                        autoSize
                        disabled={true} />
                </Form.Item>

                <Form.Item
                    name="state"
                    valuePropName="checked"
                    id="state"
                >
                    <Checkbox>Activo</Checkbox>
                </Form.Item>

            </Form>

        </Modal>
    )
}

export default ContactDialog