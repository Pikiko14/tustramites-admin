import React, { useState, useEffect } from 'react'

import HttpClient from '../../../helpers/network/HttpClient'

import { Form, Input, Button, Select, Modal } from 'antd'

const QuestionDialog = ({ question, data, setData, callback }) => {

    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    const handleOk = () => {

        if (question) {

            HttpClient.put('/api/question/' + question._id, {
                question: form.getFieldValue('question'),
                answer: form.getFieldValue('answer'),
                category: form.getFieldValue('category'),
                subcategory: form.getFieldValue('subcategory')
            })
                .then((res) => {
                    setData(null);
                    callback();
                })

        } else {

            HttpClient.post('/api/question', {
                question: form.getFieldValue('question'),
                answer: form.getFieldValue('answer'),
                category: form.getFieldValue('category'),
                subcategory: form.getFieldValue('subcategory')
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

    const getSubcategories = async () => {
        const response = await HttpClient.get('/api/subcategoryquestion');
        if (response.status == 200) {
            setSubcategories(response.data);
        }
    }

    const loadData = () => {
        let data = {
            question: question.question,
            answer: question.answer,
            category: question.category._id,
            subcategory: question.subcategory._id,
        }
        form.setFieldsValue(data);
    }

    useEffect(() => {
        form.resetFields();
        getCategories();
        getSubcategories();

        if (question) {
            loadData();
        }


    }, [question, data])

    return (
        <Modal
            visible={data}
            title="Información de la pregunta"
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
                    label="Pregunta"
                    name="question"
                    id="question"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese la pregunta!',
                        },
                        {
                            min: 10,
                            message: 'La pregunta debe tener al menos 10 caracteres!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Respuesta"
                    name="answer"
                    id="answer"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese la respuesta!',
                        },
                        {
                            min: 10,
                            message: 'La respuesta debe tener al menos 10 caracteres!',
                        },
                    ]}
                >
                    <Input type="text" />
                </Form.Item>

                <Form.Item
                    name="category"
                    id="category"
                    label="Categoría"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Seleccione una categoría"
                        allowClear
                    >
                        {
                            categories.map((item, i) => (
                                <option key={i} value={item._id}>{item.name}</option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="subcategory"
                    id="subcategory"
                    label="Subcategoría"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Seleccione una subcategoría"
                        //onChange={this.onGenderChange}
                        allowClear
                    >
                        {
                            subcategories.map((item, i) => (
                                <option key={i} value={item._id}>{item.name}</option>
                            ))
                        }
                    </Select>
                </Form.Item>

            </Form>

        </Modal>
    )
}

export default QuestionDialog