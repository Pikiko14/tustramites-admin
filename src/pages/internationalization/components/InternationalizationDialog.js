import React, { useState, useEffect } from 'react'
import { Modal } from 'antd';

import HttpClient from '../../../helpers/network/HttpClient'

import { Form, Input, Checkbox, Button } from 'antd'

const InternationalizationDialog = ({ internationalization, data, setData, callback }) => {

    const [form] = Form.useForm();

    const handleOk = () => {

        HttpClient.put('/api/internationalization/' + internationalization._id, {
            name: form.getFieldValue('name'),
            state: form.getFieldValue('state')
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
        if (internationalization) {
            let data = {
                name: internationalization.name,
                state: internationalization.state
            }
            form.setFieldsValue(data);
        }

    }, [internationalization, data])

    return (
        <Modal
            visible={data}
            title="Editar idioma"
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
                            min: 7,
                            message: 'El nombre debe tener al menos 5 caracteres!',
                        },
                    ]}
                >
                    <Input />
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

export default InternationalizationDialog