import React, { useState, useEffect } from 'react'

import Alert from '../../../helpers/alert/Alert'

import HttpClient from '../../../helpers/network/HttpClient'
import axios from 'axios'

import { Modal, Form, Checkbox, Upload, Button, Input } from 'antd'
import ImgCrop from 'antd-img-crop';

const BannerDialog = ({ banner, data, setData, callback }) => {

    const [form] = Form.useForm();
    const [files, setFiles] = useState([]);

    const onChange = (file) => {
        setFiles(file.fileList);
    };

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

    const getImages = (url) => {
        let reader = new FileReader();
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'blob';
        request.onload = function () {
            reader.readAsDataURL(request.response)
            reader.onload = function (e) {

                let image = new Image();
                image.src = e.target.result;

                image.onload = function () {
                    return image;
                };
            };
        };
        request.send();
    }

    const validateSizeImage = () => {
        let reader = new FileReader();
        /*if (files[0].url) {
            let request = new XMLHttpRequest();
            request.open('GET', files[0].url, true);
            request.responseType = 'blob';
            request.onload = function () {
                reader.readAsDataURL(request.response)
                reader.onload = function (e) {

                    let image = new Image();
                    image.src = e.target.result;

                    image.onload = function () {
                        var height = this.height;
                        var width = this.width;
                        console.log(height+' '+width)
                        if (height == 840 && width == 1920)
                            return true;
                        else
                            return false;
                    };
                };
            };
            request.send();
        }

        else {*/
        reader.readAsDataURL(files[0].originFileObj);
        reader.onload = function (e) {

            let image = new Image();
            image.src = e.target.result;

            image.onload = function () {
                var height = this.height;
                var width = this.width;

                if (height == 840 && width == 1920)
                    return true;
                else
                    return false;
            };
        };
        //}
    }


    const handleOk = async () => {

        const formData = new FormData();
        if (files.length > 0) {
            if (files[0].url || validateSizeImage()) {
                if (banner) {

                    if (files[0].originFileObj)
                        formData.append("image", files[0].originFileObj);
                    formData.append("banner", JSON.stringify({
                        name: form.getFieldValue('name'),
                        state: form.getFieldValue('state'),
                        url_image: ""
                    }));

                    HttpClient.put('/api/banner/' + banner._id, formData)
                        .then((res) => {
                            setData(null);
                            callback();
                        })

                } else {

                    formData.append("image", files[0].originFileObj);
                    formData.append("banner", JSON.stringify({
                        name: form.getFieldValue('name'),
                        state: form.getFieldValue('state'),
                        url_image: ""
                    }));

                    HttpClient.post('/api/banner', formData)
                        .then((res) => {
                            setData(null);
                            callback();
                        })

                }
            } else {
                Alert.show({
                    type: "error",
                    title: "Error",
                    message: "El banner debe tener un ancho de 1940 y una altuna de 840.",
                    btnOk: "Aceptar",
                    fnOk: () => { },
                    btnCancel: "Cancelar"
                })
            }
        } else {

            Alert.show({
                type: "error",
                title: "Error",
                message: "El banner debe contar con una imagen.",
                btnOk: "Aceptar",
                fnOk: () => { },
                btnCancel: "Cancelar"
            })

        }

    }

    const handleCancel = () => {
        setData(null);
    }


    useEffect(() => {

        form.resetFields();
        if (banner) {
            let data = {
                name: banner.name,
                state: banner.state,
            }
            form.setFieldsValue(data);

            let urlFile = banner.url_image;
            getImage(urlFile);
        } else {
            setFiles([]);
        }

    }, [banner, data])

    return (
        <Modal
            visible={data}
            title="Información del banner"
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
                    label="Recuerde que la imagen debe contar con las siguientes medidas: 1920 x 840"
                >
                </Form.Item>

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
                            min: 5,
                            message: 'El nombre debe tener al menos 5 caracteres!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Upload
                    rotate={false}
                    aspect={80 / 20}
                    modalTitle={"Editar Imagen"}
                    listType="picture-card"
                    fileList={files}
                    defaultFileList={[...files]}
                    onChange={onChange}
                //beforeUpload={beforeUpload}
                >
                    {files.length == 0 && '+ Upload'}
                </Upload>

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

export default BannerDialog