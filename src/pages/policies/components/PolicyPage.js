import React, { useState, useEffect } from 'react'
import queryString from 'query-string'

// COMPONENTS
import Layout from '../../../components/layout/Layout'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import HttpClient from '../../../helpers/network/HttpClient'
import { Form, Input, Button } from 'antd'

const PolicyPage = (props) => {

    const [form] = Form.useForm();
    const [content, setContent] = useState();
    const [page, setPage] = useState();

    const handleOk = () => {

        if (page) {

            HttpClient.put('/api/page/' + page._id, {
                title: form.getFieldValue('title'),
                url: form.getFieldValue('url'),
                content: content
            })
                .then((res) => {
                    props.history.push('/website/page');
                })

        } else {
            HttpClient.post('/api/page', {
                title: form.getFieldValue('title'),
                url: form.getFieldValue('url'),
                content: content
            })
                .then((res) => {
                    props.history.push('/website/page');
                })

        }

    }

    const onChangeH = (e) => { 
        setContent(e.toHTML());
    };

    const loadValues = async (id) => {
        const response = await HttpClient.get('/api/page/' + id);
        if (response.status == 200) {
            setPage(response.data);

            let data = {
                title: response.data.title,
                url: response.data.url,
                //content: response.data.content
                content: BraftEditor.createEditorState(response.data.content)
            }
            setContent(response.data.content);
            form.setFieldsValue(data);
        }
    }

    useEffect(() => {
        form.resetFields();
        let { id } = queryString.parse(props.location.search);
        if (id) {
            loadValues(id);
        }

    }, [])

    return (
        <Layout>

            <div className="header-page">
                <h1>Políticas de Privacidad</h1>

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
                                <Button href={"/website/page"}>Regresar</Button>
                            </li>
                        </ul>
                    </div>
                    <Form
                        layout="vertical"
                        form={form} 
                        autoComplete="off">

                        <Form.Item
                            label="Titulo"
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
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="URL"
                            name="url"
                            id="url"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese la url!',
                                },
                                {
                                    min: 5,
                                    message: 'La url debe tener al menos 5 caracteres!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="content"
                            id="content"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese el contenido',
                                },
                            ]}
                        >
                            <BraftEditor
                                value={content}
                                onChange={onChangeH}
                                language="en"
                        />
                        </Form.Item>/

                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default PolicyPage
