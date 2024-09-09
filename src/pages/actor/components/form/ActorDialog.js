import React, { useState, useEffect } from 'react'
import { Modal } from 'antd';

import HttpClient from '../../../../helpers/network/HttpClient'

import { Form, Input, Button } from 'antd';

const ActorDialog = ({ actor, data, setData, callback }) => {

    const [form] = Form.useForm();

    const handleOk = () => {

        if (actor) {
            HttpClient.put('/api/actor/' + actor._id, {
                name: form.getFieldValue('name')
            })
                .then((res) => {
                    setData(null);
                    callback();
                })
        } else {
            HttpClient.post('/api/actor', {
                name: form.getFieldValue('name')
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
        if (actor) {
            let data = { name: actor.name }
            form.setFieldsValue(data);
        }

    }, [actor,data])

    return (
        <Modal
            visible={data}
            title="Información del Cliente"
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
                form={form}>

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

            </Form>

        </Modal>
    )
}

export default ActorDialog