import React, { useState, useEffect } from 'react'

import HttpClient from '../../../helpers/network/HttpClient'

import { Modal,Select, Form, Input, Button } from 'antd'

const SubcategoryQuestionDialog = ({ subcategory, data, setData, callback }) => {

    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);

    const handleOk = () => {

        if (subcategory) {

            HttpClient.put('/api/subcategoryquestion/' + subcategory._id, {
                name: form.getFieldValue('name'),
                category: form.getFieldValue('category')
            })
                .then((res) => {
                    setData(null);
                    callback();
                })

        } else {

            HttpClient.post('/api/subcategoryquestion', {
                name: form.getFieldValue('name'),
                category: form.getFieldValue('category'),
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

    const getCategories = async () => {
        const response = await HttpClient.get('/api/categoryquestion');
        if (response.status == 200) {
            setCategories(response.data);
        }
    }

    useEffect(() => {
        form.resetFields();
        getCategories();
        if (subcategory) {
            let data = {
                name: subcategory.name,
                category: subcategory.category._id,
            }
            form.setFieldsValue(data);
        }

    }, [subcategory, data])

    return (
        <Modal
            visible={data}
            title="Información de la subcategoría"
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
                    name="category"
                    id="category"
                    label="Categoría"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor seleccione una categoria',
                        },
                    ]}
                >
                    <Select
                        placeholder="Seleccione una categoría"
                        //onChange={this.onGenderChange}
                        hasFeedback
                        allowClear
                    >
                        {
                            categories.map((item, i) => (
                                <option key={i} value={item._id}>{item.name}</option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default SubcategoryQuestionDialog