import React, { useState, useEffect } from 'react'
import { InputNumber, Modal } from 'antd';

import HttpClient from '../../../helpers/network/HttpClient'

import { Form, Input, Button, Select, Upload } from 'antd'
import ImgCrop from 'antd-img-crop';

const UserDialog = ({ user, data, setData, callback }) => {

    const [form] = Form.useForm();
    const [files, setFiles] = useState([]);

    const onChange = (file) => {
        setFiles(file.fileList);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const handleOk = () => {

        const formData = new FormData();

        if (user) {
            if (files.length > 0)
                formData.append("image", files[0].originFileObj);

            formData.append("user", JSON.stringify({
                first_name: form.getFieldValue('first_name'),
                last_name: form.getFieldValue('last_name'),
                email: form.getFieldValue('email'),
                password: form.getFieldValue('password'),
                role: form.getFieldValue('role'),
                url_image: ""
            }));


            HttpClient.put('/api/user/' + (user._id ? user._id : user.id), formData)
                .then((res) => {
                    setData(null);
                    callback(user._id ? user._id : user.id);
                })

        } else {

            if (files.length > 0)
                formData.append("image", files[0].originFileObj);

            formData.append("user", JSON.stringify({
                first_name: form.getFieldValue('first_name'),
                last_name: form.getFieldValue('last_name'),
                email: form.getFieldValue('email'),
                password: form.getFieldValue('password'),
                role: form.getFieldValue('role'),
                url_image: ""
            }));

            HttpClient.post('/api/user', formData)
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
        if (user) {
            let data = {
                first_name: user.first_name,
                last_name: user.last_name,
                password: user.password,
                email: user.email,
                role: user.role
            }
            form.setFieldsValue(data);
            if (user.url_image) {

                let urlFile = user.url_image;
                setFiles(
                    [{
                        uid: '-1',
                        name: 'load.png',
                        status: 'done',
                        url: urlFile,
                        thumbUrl: urlFile,
                    }]
                )

            }
        } else {
            setFiles([]);
        }

    }, [user, data])

    return (
        <Modal
            visible={data}
            title="Información del usuario"
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
                    onClick={handleOk}>
                    Guardar
                </Button>
            ]}
        >
            <Form
                layout="vertical"
                form={form} >

                <Form.Item
                    label="Nombre(s)"
                    name="first_name"
                    id="first_name"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el (los) nombre(s)!',
                        },
                        {
                            min: 4,
                            message: 'El (Los) nombre(s) debe(n) tener al menos 3 caracteres!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Apellidos"
                    name="last_name"
                    id="last_name"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese los apellidos!',
                        },
                        {
                            min: 4,
                            message: 'Los apellidos deben tener al menos 4 caracteres!',
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
                    label="Contraseña"
                    name="password"
                    id="password"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese la contraseña!',
                        },
                        {
                            min: 8,
                            message: 'La contraseña debe tener al menos 8 caracteres!',
                        },
                    ]}
                >
                    <Input type="password" />
                </Form.Item>

                <Form.Item
                    name="role"
                    id="role"
                    label="Rol"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Seleccione un rol"
                        allowClear
                    >
                        <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                        <option value="ASESOR LEGAL">ASESOR LEGAL</option>
                        <option value="CALL CENTER">CALL CENTER</option>
                    </Select>
                </Form.Item>

                <ImgCrop
                    rotate={false}
                    aspect={50 / 50}
                    modalTitle={"Editar Imagen"}>
                    <Upload
                        listType="picture-card"
                        fileList={files}
                        defaultFileList={[...files]}
                        onChange={onChange}
                    >
                        {files.length == 0 && '+ Upload'}
                    </Upload>
                </ImgCrop>

            </Form>

        </Modal>
    )
}

export default UserDialog