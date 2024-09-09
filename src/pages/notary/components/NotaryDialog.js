import React, { useState, useEffect } from 'react'
import { InputNumber, Modal, Form, Input, Button, Select, Row, Checkbox } from 'antd';

import HttpClient from '../../../helpers/network/HttpClient'

// RESOURCE
import json_location from '../../../json/states-cities.json';
//COMPONENTS
import Schedule from './Schedule';
import Alert from '../../../helpers/alert/Alert';

const NotaryDialog = ({ notary, data, setData, callback }) => {

    const [form] = Form.useForm();
    const [cities, setCities] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const { TextArea } = Input;

    const handleOk = () => {
        if (schedules.length > 0) {
            if (form.getFieldValue('name') !== undefined &&form.getFieldValue('name') !== '' &&
                form.getFieldValue('contact') !== '' && form.getFieldValue('contact') !== undefined &&
                form.getFieldValue('address') !== '' && form.getFieldValue('address') !== undefined &&
                form.getFieldValue('email') !== '' && form.getFieldValue('email') !== undefined &&
                form.getFieldValue('phone') !== '' && form.getFieldValue('phone') !== undefined &&
                form.getFieldValue('province') !== '' && form.getFieldValue('province') !== undefined &&
                form.getFieldValue('city') !== '' && form.getFieldValue('city') !== undefined &&
                form.getFieldValue('sector') !== '' && form.getFieldValue('sector') !== undefined) {

                let schedule = new Object();
                schedule = { schedules };
                if (notary) {

                    HttpClient.put('/api/notary/' + notary._id, {
                        name: form.getFieldValue('name'),
                        contact: form.getFieldValue('contact'),
                        address: form.getFieldValue('address'),
                        email: form.getFieldValue('email'),
                        phone: form.getFieldValue('phone'),
                        country: 'Ecuador',
                        province: form.getFieldValue('province'),
                        city: form.getFieldValue('city'),
                        sector: form.getFieldValue('sector'),
                        schedule: schedule
                    })
                        .then((res) => {
                            setData(null);
                            callback();
                        })

                } else {

                    HttpClient.post('/api/notary', {
                        name: form.getFieldValue('name'),
                        contact: form.getFieldValue('contact'),
                        address: form.getFieldValue('address'),
                        email: form.getFieldValue('email'),
                        phone: form.getFieldValue('phone'),
                        country: 'Ecuador',
                        province: form.getFieldValue('province'),
                        city: form.getFieldValue('city'),
                        sector: form.getFieldValue('sector'),
                        schedule: schedule
                    })
                        .then((res) => {
                            setData(null);
                            callback();
                        })

                }
            } else {
                Alert.show({
                    type: "error",
                    title: "Error",
                    message: "Hay campos obligatorios que no han sido diligenciados.",
                    btnOk: "Aceptar",
                    fnOk: () => { },
                    btnCancel: "Cancelar"
                })
            }

        } else {
            Alert.show({
                type: "error",
                title: "Error",
                message: "El horario es obligatorio.",
                btnOk: "Aceptar",
                fnOk: () => { },
                btnCancel: "Cancelar"
            })
        }

    }

    const handleChangeProvince = (value) => {

        const state = json_location.find(x => x.state == value);
        setCities(state.cities)
    }

    const handleCancel = () => {
        setData(null);
    }

    useEffect(() => {
        form.resetFields();
        if (notary) {
            let data = {
                name: notary.name,
                contact: notary.contact,
                address: notary.address,
                email: notary.email,
                phone: notary.phone,
                province: notary.province,
                city: notary.city,
                sector: notary.sector
            }
            form.setFieldsValue(data);
            setSchedules(notary.schedule.schedules);
            handleChangeProvince(data.province)
        } else {
            setSchedules([])
        }

    }, [notary, data])

    return (
        <Modal
            visible={data}
            title="Información de la notaria"
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
                    label="Contacto"
                    name="contact"
                    id="contact"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el contacto!',
                        },
                        {
                            min: 5,
                            message: 'El contacto debe tener al menos 5 caracteres!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Dirección"
                    name="address"
                    id="address"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese la dirección!',
                        },
                        {
                            min: 4,
                            message: 'La dirección debe tener al menos 4 caracteres!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Correo"
                    name="email"
                    id="email"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: 'El valor ingresado no es un correo eléctronico!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Teléfono"
                    name="phone"
                    id="phone"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el número teléfono!',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="province"
                    id="province"
                    label="Provincia"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Seleccione una provincia"
                        onChange={handleChangeProvince}
                        allowClear
                    >
                        {json_location.map((province, i) => (
                            <option key={i} value={province.state}>{province.state}</option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="city"
                    id="city"
                    label="Ciudad"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Seleccione una ciudad"
                        allowClear
                    >
                        {cities.map((city, i) => (
                            <option key={i} value={city}>{city}</option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="sector"
                    id="sector"
                    label="sector"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Seleccione un sector"
                        allowClear
                    >
                        <option value="NORTE">NORTE</option>
                        <option value="CENTRO">CENTRO</option>
                        <option value="SUR">SUR</option>
                    </Select>
                </Form.Item>

                <Schedule
                    form={form}
                    setSchedules={setSchedules}
                    schedules={schedules}
                />
            </Form>

        </Modal>
    )
}

export default NotaryDialog