import React from 'react'
import { Form, Input, Select } from 'antd'

const TabHeader = ({ form, listCategories, TextArea }) => {
    return (
        <>
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
                        message: 'El nombre debe tener al menos 5 caracteres!',
                    },
                ]}
            >
                <Input placeholder="Ingrese el nombre del tramite" />
            </Form.Item>

            <Form.Item
                name="category"
                id="category"
                label="Categoria"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    placeholder="Seleccione una categoria"
                    allowClear
                    hasFeedback
                >
                    {
                        listCategories.map((item, i) => (
                            <option key={i} value={item._id}>{item.name}</option>
                        ))
                    }
                </Select>
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
                        min: 10,
                        message: 'La descripción debe tener al menos 10 caracteres!',
                    },
                ]}
            >
                <TextArea
                    autoSize
                    placeholder="Ingrese una descripción"
                />
            </Form.Item>

            <Form.Item
                label="Nota 1"
                name="note"
                id="note"
            >
                <TextArea
                    autoSize
                    placeholder="Ingrese la nota"
                />

            </Form.Item>
        </>
    )
}

export default TabHeader
