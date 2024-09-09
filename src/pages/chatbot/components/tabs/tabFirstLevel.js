import React from 'react'
import { Form, Input, Checkbox } from 'antd'

const TabFirstLevel = ({ form, TextArea }) => {
    return (
        <>
            <Form.Item
                label="Número"
                name="key"
                id="key"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese el número!',
                    },
                    {
                        min: 1,
                        message: 'El número debe tener al menos 1 digito!',
                    },
                    {
                        max: 2,
                        message: 'El número debe tener máximo 2 digitos!',
                    }
                ]}
            >
                <Input type="number" placeholder="Ingrese el número de la opción del chatbot" />
            </Form.Item>
            <Form.Item
                label="Título"
                name="title"
                id="title"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese el titulo!',
                    },
                    {
                        min: 4,
                        message: 'El titulo debe tener al menos 4 caracteres!',
                    },
                    {
                        max: 80,
                        message: 'El titulo debe tener maximo 80 caracteres!',
                    },
                ]}
            >
                <Input placeholder="Ingrese el título de la opción del chatbot" />
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
                    placeholder="Ingrese una descripción"
                    rows={2}
                    autoSize={{ minRows: 1, maxRows: 3 }}
                    maxLength={400}
                    showCount={true}
                />
            </Form.Item>

            <Form.Item
                name="whatsapp"
                valuePropName="checked"
                id="whatsapp"
            >
                <Checkbox>¿Comunicación por whatsapp?</Checkbox>
            </Form.Item>

            <Form.Item
                name="state"
                valuePropName="checked"
                id="state"
            >
                <Checkbox>¿Activo?</Checkbox>
            </Form.Item>

        </>
    )
}

export default TabFirstLevel