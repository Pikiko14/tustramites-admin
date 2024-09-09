import React, { useState, useEffect } from 'react'

import Alert from '../../../helpers/alert/Alert';

import HttpClient from '../../../helpers/network/HttpClient'

import { Modal, Form, Checkbox, Upload, Button, Input } from 'antd'
import ImgCrop from 'antd-img-crop';

const CommentDialog = ({ comment, data, setData, callback }) => {

    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [file, setFile] = useState();
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
        if (files.length > 0) {
            if (comment) {

                //if (file)
                formData.append("image", files[0].originFileObj);

                formData.append("comment", JSON.stringify({
                    fullname: form.getFieldValue('fullname'),
                    position_company: form.getFieldValue('position_company'),
                    comment: form.getFieldValue('comment'),
                    state: form.getFieldValue('state'),
                    url_image: ""
                }));

                HttpClient.put('/api/comment/' + comment._id, formData)
                    .then((res) => {
                        setData(null);
                        callback();
                    })

            } else {

                formData.append("image", files[0].originFileObj);

                formData.append("comment", JSON.stringify({
                    fullname: form.getFieldValue('fullname'),
                    position_company: form.getFieldValue('position_company'),
                    comment: form.getFieldValue('comment'),
                    state: form.getFieldValue('state'),
                    url_image: ""
                }));

                HttpClient.post('/api/comment', formData)
                    .then((res) => {
                        setData(null);
                        callback();
                    })

            }
        } else {

            Alert.show({
                type: "error",
                title: "Error",
                message: "El comentario debe contar con una imagen.",
                btnOk: "Aceptar",
                fnOk: () => { },
                btnCancel: "Cancelar"
            })

        }

    }

    const handleCancel = () => {
        setData(null);
    }

    const getImage = async (url) => {

        const image = process.env.REACT_APP_URL_API + "/api/storage?url=" + url;

        setFiles(
            [{
                uid: '-1',
                name: 'load.png',
                status: 'done',
                url: image,
                thumbUrl: image,
            }]
        )
    }

    useEffect(() => {
        form.resetFields();
        if (comment) {
            let data = {
                fullname: comment.fullname,
                position_company: comment.position_company,
                comment: comment.comment,
                state: comment.state,
            }
            form.setFieldsValue(data);
            getImage(comment.url_image);
        } else {
            setFiles([]);
        }

    }, [comment, data])

    return (
        <Modal
            visible={data}
            title="Información del comentario"
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
                    label="Nombre"
                    name="fullname"
                    id="fullname"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el nombre!',
                        },
                        {
                            min: 5,
                            message: 'El nombre debe tener al menos 5 caracteres!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Cargo y Empresa"
                    name="position_company"
                    id="position_company"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el cargo y el nombre de la empresa!',
                        },
                        {
                            min: 5,
                            message: 'El cargo y el nombre de la empresa debe tener al menos 5 caracteres!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Comentario"
                    name="comment"
                    id="comment"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el comentario!',
                        },
                        {
                            min: 5,
                            message: 'El comentario debe tener al menos 5 caracteres!',
                        },
                    ]}
                >
                    <TextArea
                        autoSize
                        placeholder="Ingrese un comentario"
                    />
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

                <Form.Item
                    name="state"
                    valuePropName="checked"
                    id="state"
                >
                    <Checkbox>Activo</Checkbox>
                </Form.Item>

            </Form>

        </Modal>
    )
}

export default CommentDialog