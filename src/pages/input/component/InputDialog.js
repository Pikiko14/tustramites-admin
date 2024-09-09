import React, { useState, useEffect } from 'react'

import HttpClient from '../../../helpers/network/HttpClient'

import { Form, Input, Button, Select, Checkbox, Modal } from 'antd'

const InputDialog = ({ input, data, setData, callback }) => {

    const [form] = Form.useForm();

    const handleOk = () => {

        if (input) {

            HttpClient.put('/api/input/' + input._id, {
                name: form.getFieldValue('name'),
                type: form.getFieldValue('type'),
                required: form.getFieldValue('required') ? form.getFieldValue('required') : false,
                maxCant: form.getFieldValue('maxCant'),
                minCant: form.getFieldValue('minCant'),
                validation: form.getFieldValue('validation') ? form.getFieldValue('validation') : false,
                actor: true
            })
                .then((res) => {
                    setData(null);
                    callback();
                })

        } else {

            HttpClient.post('/api/input', {
                name: form.getFieldValue('name'),
                type: form.getFieldValue('type'),
                required: form.getFieldValue('required') ? form.getFieldValue('required') : false,
                maxCant: form.getFieldValue('maxCant'),
                minCant: form.getFieldValue('minCant'),
                validation: form.getFieldValue('validation') ? form.getFieldValue('validation') : false,
                actor: true
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
        if (input) {
            let data = {
                name: input.name,
                type: input.type,
                required: input.required,
                maxCant: input.maxCant,
                minCant: input.minCant,
                validation: input.validation,
                actor: input.actor,
            }
            form.setFieldsValue(data);
        }

    }, [input, data])

    return (
        <Modal
            visible={data}
            title="Información del campo"
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
                        <option value="text">Texto</option>
                        <option value="number">Número</option>
                        <option value="date">Fecha</option>
                        <option value="email">Correo eléctronico</option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="required"
                    valuePropName="checked"
                    id="required"
                >
                    <Checkbox>Requerido</Checkbox>
                </Form.Item>

                <Form.Item
                    label="Minima cantidad de caracteres"
                    name="minCant"
                    id="minCant"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese la cantidad minima de caracteres!',
                        }
                    ]}
                >
                    <Input
                        type="number"
                    />
                </Form.Item>

                <Form.Item
                    label="Maxima cantidad de caracteres"
                    name="maxCant"
                    id="maxCant"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese la cantidad maxima de caracteres!',
                        }
                    ]}
                >
                    <Input
                        type="number"
                    />
                </Form.Item>

                <Form.Item
                    name="validation"
                    valuePropName="checked"
                    id="validation"
                >
                    <Checkbox>Aplica para otras opciones</Checkbox>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default InputDialog