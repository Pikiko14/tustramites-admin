import React, { useState, useEffect } from 'react'
import { Modal } from 'antd';

import HttpClient from '../../../helpers/network/HttpClient'

import { Form, Input, Button } from 'antd'

const CategoryQuestionDialog = ({ category, data, setData, callback }) => {

    const [form] = Form.useForm();

    const handleOk = () => {

        if (category) {

            HttpClient.put('/api/categoryquestion/' + category._id, {
                name: form.getFieldValue('name')
            })
                .then((res) => {
                    setData(null);
                    callback();
                })

        } else {

            HttpClient.post('/api/categoryquestion', {
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
        if (category) {
            let data = {
                name: category.name
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
                            message: 'El nombre debe tener al menos 5 caracteres!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default CategoryQuestionDialog