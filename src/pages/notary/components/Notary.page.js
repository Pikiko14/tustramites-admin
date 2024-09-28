import React, { useState, useEffect } from 'react'
import { InputNumber, Modal, Form, Input, Button, Select, Row, Checkbox } from 'antd';

import HttpClient from '../../../helpers/network/HttpClient'
import queryString from 'query-string'

// COMPONENTS
import Layout from '../../../components/layout/Layout'

// RESOURCE
import json_location from '../../../json/states-cities.json';
import json_banks from '../../../json/banks.json';
//COMPONENTS
import Schedule from './Schedule';
import Alert from '../../../helpers/alert/Alert';

const NotaryPage = (props) => {

    const [form] = Form.useForm();
    const [cities, setCities] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const { TextArea } = Input;

    const handleOk = () => {
        let { id } = queryString.parse(props.location.search);

        if (schedules.length > 0) {
            if (form.getFieldValue('name') !== undefined && form.getFieldValue('name') !== '' &&
                form.getFieldValue('contact') !== '' && form.getFieldValue('contact') !== undefined &&
                form.getFieldValue('address') !== '' && form.getFieldValue('address') !== undefined &&
                form.getFieldValue('email') !== '' && form.getFieldValue('email') !== undefined &&
                form.getFieldValue('phone') !== '' && form.getFieldValue('phone') !== undefined &&
                form.getFieldValue('province') !== '' && form.getFieldValue('province') !== undefined &&
                form.getFieldValue('city') !== '' && form.getFieldValue('city') !== undefined &&
                form.getFieldValue('sector') !== '' && form.getFieldValue('sector') !== undefined &&
                form.getFieldValue('commissioner') !== '' && form.getFieldValue('commissioner') !== undefined &&
                form.getFieldValue('type_bank_account') !== '' && form.getFieldValue('type_bank_account') !== undefined &&
                form.getFieldValue('account_number') !== '' && form.getFieldValue('account_number') !== undefined &&
                form.getFieldValue('bank') !== '' && form.getFieldValue('bank') !== undefined) {

                let schedule = new Object();
                schedule = { schedules };

                const notary = {
                    name: form.getFieldValue('name'),
                    contact: form.getFieldValue('contact'),
                    address: form.getFieldValue('address'),
                    email: form.getFieldValue('email'),
                    phone: form.getFieldValue('phone'),
                    country: 'Ecuador',
                    province: form.getFieldValue('province'),
                    city: form.getFieldValue('city'),
                    sector: form.getFieldValue('sector'),
                    schedule: schedule,
                    commissioner: form.getFieldValue('commissioner'),
                    type_bank_account: form.getFieldValue('type_bank_account'),
                    account_number: form.getFieldValue('account_number'),
                    bank: form.getFieldValue('bank'),
                    google_map: form.getFieldValue('google_map')
                }

                if (id) {

                    HttpClient.put('/api/notary/' + id, notary)
                        .then((res) => {
                            props.history.push('/notary');
                        })

                } else {

                    HttpClient.post('/api/notary', notary)
                        .then((res) => {
                            props.history.push('/notary');
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
        setCities(state.cities);
        let data = {
            city: '',
            sector: ''
        }
        form.setFieldsValue(data);
    }

    const loadValues = async (id) => {
        const response = await HttpClient.get('/api/notary/' + id);

        if (response.status == 200) {

            let data = {
                name: response.data.name,
                contact: response.data.contact,
                address: response.data.address,
                email: response.data.email,
                phone: response.data.phone,
                province: response.data.province,
                city: response.data.city,
                sector: response.data.sector,
                commissioner: response.data.commissioner,
                type_bank_account: response.data.type_bank_account,
                account_number: response.data.account_number,
                bank: response.data.bank,
                google_map: response.data.google_map,
            }

            form.setFieldsValue(data);
            setSchedules(response.data.schedule.schedules);
            //handleChangeProvince(response.data.province)
        }
    }

    useEffect(() => {
        form.resetFields();
        let { id } = queryString.parse(props.location.search);
        if (id) {
            loadValues(id);
        } else {
            setSchedules([])
        }

    }, [])

    return (
        <Layout>

            <div className="header-page">
                <h1>Notaria</h1>

                <div className="main-card card">

                    <div className="main-card-action">
                        <ul>
                            <li>
                                <Button
                                    type="primary"
                                    onClick={() => handleOk()}
                                >
                                    Guardar
                                </Button>
                            </li>
                            <li>
                                <Button href={"/notary"}>Regresar</Button>
                            </li>
                        </ul>
                    </div>

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
                            <InputNumber style={{ width: '100%' }} />
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

                        <Form.Item
                            label="Notario"
                            name="commissioner"
                            id="commissioner"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese el nombre del notario',
                                },
                                {
                                    min: 4,
                                    message: 'El nombre del notario debe tener al menos 3 caracteres!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="type_bank_account"
                            id="type_bank_account"
                            label="Tipo de cuenta bancaria"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                placeholder="Seleccione un tipo de cuenta"
                                allowClear
                            >
                                <option value="AHORROS">Ahorros</option>
                                <option value="CORRIENTE">Corriente</option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Número de cuenta"
                            name="account_number"
                            id="account_number"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese el número de cuenta bancaria!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>

                        {/*<Form.Item
                            name="bank"
                            id="bank"
                            label="Banco"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                placeholder="Seleccione un banco"
                                allowClear
                            >
                                {json_banks.map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </Select>
                                </Form.Item>*/}

                        <Form.Item
                            name="bank"
                            id="bank"
                            label="Banco"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese el nombre del banco',
                                },
                                {
                                    min: 3,
                                    message: 'El nombre del banco debe tener al menos 3 caracteres!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="google_map"
                            id="google_map"
                            label="Mapa de google"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese el mapa',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Schedule
                            form={form}
                            setSchedules={setSchedules}
                            schedules={schedules}
                        />
                    </Form>

                </div>
            </div>
        </Layout>
    )
}

export default NotaryPage