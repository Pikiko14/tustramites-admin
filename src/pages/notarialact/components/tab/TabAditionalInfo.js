import React from 'react'
import { Form, Input, Checkbox, Select} from 'antd'

const TabAditionalInfo = ({form, pages}) => {
    return (
        <>
            <Form.Item
                label="Tiempo de entrega del borrador"
                name="time_delivery"
                id="time_delivery"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Duración del tramite"
                name="duration"
                id="duration"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese la duración!',
                    },
                    {
                        min: 4,
                        message: 'La duración debe tener al menos 4 caracteres!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="notary"
                valuePropName="checked"
                id="notary"
            >
                <Checkbox>Trámite con notaría</Checkbox>
            </Form.Item>

            <Form.Item
                label="Entrega borrador"
                name="document_result"
                id="document_result"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="payment"
                valuePropName="checked"
                id="payment"
            >
                <Checkbox>Aplica pago en plataforma</Checkbox>
            </Form.Item>

            <Form.Item
                name="date"
                valuePropName="checked"
                id="date"
            >
                <Checkbox>Requiere cita en notaría</Checkbox>
            </Form.Item>

            <Form.Item
                    name="page"
                    id="page"
                    label="Politica y trátamiento de datos"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Seleccione una PYTD"
                        allowClear
                    >
                        {
                            pages.map((item, i) => (
                                <option key={i} value={item._id}>{item.title}</option>
                            ))
                        }
                    </Select>
                </Form.Item>
        </>
    )
}

export default TabAditionalInfo
