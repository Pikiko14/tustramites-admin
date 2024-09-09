import React, { useState, useEffect } from 'react'
import { Modal } from 'antd';

import HttpClient from '../../../helpers/network/HttpClient'

import { Form, Input, Button } from 'antd'

const CategoryDialog = ({ category, data, setData, callback }) => {

    const [form] = Form.useForm();

    const handleOk = () => {


        if (category) {

            HttpClient.put('/api/category/' + category._id, {
                name: form.getFieldValue('name'),
                description: form.getFieldValue('description')
            })
                .then((res) => {
                    setData(null);
                    callback();
                })

        } else {

            HttpClient.post('/api/category', {
                name: form.getFieldValue('name'),
                description: form.getFieldValue('description')
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
        if (category) {
            let data = {
                name: category.name,
                description: category.description
            }
            form.setFieldsValue(data);
        }

    }, [category, data])

    return (
        <Modal
            visible={data}
            title="Información de la categoría"
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
                            message: 'El nombre debe tener al menos 7 caracteres!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Descripción"
                    name="description"
                    id="description"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese la descripción!',
                        },
                        {
                            min: 7,
                            message: 'la descripción debe tener al menos 7 caracteres!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

            </Form>

        </Modal>
    )
}

export default CategoryDialog