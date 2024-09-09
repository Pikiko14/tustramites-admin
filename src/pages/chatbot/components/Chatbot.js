import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Tabs } from 'antd'
import queryString from 'query-string'

import HttpClient from '../../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../../components/layout/Layout'
import TabFirstLevel from './tabs/tabFirstLevel'
import TabSecondLevel from './tabs/tabSecondLevel'
import TabThirthLevel from './tabs/tabThirthLevel'
import Alert from '../../../helpers/alert/Alert'

const Chatbot = (props) => {

    const [chatbot, setChatbot] = useState();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [secondLevel, setSecondLevel] = useState([]);
    const [thirthLevel, setThirthLevel] = useState([]);
    const { TabPane } = Tabs;

    const callbackChatbot = () => {

        props.history.push('/chatbot');
    }

    const loadValues = async (id) => {

        const response = await HttpClient.get('/api/chatbot/' + id);
        if (response.status == 200) {
            setChatbot(response.data)
            let data = {
                key: response.data.key,
                title: response.data.title,
                description: response.data.description,
                whatsapp: response.data.whatsapp,
                state: response.data.state
            }
            form.setFieldsValue(data);

            let secondTemp = response.data.secondLevel
            let thirthTemp = []
            secondTemp.forEach(element => {
                element.sons.forEach(item => {
                    thirthTemp.push(item)
                })
            })
            setThirthLevel(thirthTemp)
            delete secondTemp['sons']
            setSecondLevel(secondTemp)
        }
    }


    useEffect(() => {
        form.resetFields();
        let { id } = queryString.parse(props.location.search);
        if (id) {
            loadValues(id);
        }
    }, [])

    const handleOk = async () => {
        let key = form.getFieldValue('key')
        let title = form.getFieldValue('title')
        let description = form.getFieldValue('description')
        let whatsapp = form.getFieldValue('whatsapp')
        let state = form.getFieldValue('state')
        if (key != '' && title != '' || description != '') {
            if (thirthLevel.length > 0) {
                let newArraySecond = [...secondLevel]
                let newArrayThirth = [...thirthLevel]
                newArraySecond.map((item) => {
                    item.sons = newArrayThirth.filter((element => element.secondLevel == item.title))
                    return item
                })
                setSecondLevel(newArraySecond)
            } else {
                let newArraySecond = [...secondLevel]
                newArraySecond.map((item) => {
                    item.sons = []
                    return item
                })
                setSecondLevel(newArraySecond)
            }

            let body = {
                key: key,
                title: title,
                description: description,
                secondLevel: secondLevel,
                whatsapp: whatsapp || false,
                state: state || false
            }

            if (chatbot) {
                const response = await HttpClient.put('/api/chatbot/' + chatbot._id, body)
                if (response.status == 200) {
                    form.setFieldsValue(null)
                    callbackChatbot();
                }
            } else {
                HttpClient.post('/api/chatbot/', body)
                    .then((res) => {
                        form.setFieldsValue(null)
                        callbackChatbot();
                    })
                    .catch((err) => {
                        Alert.show({
                            type: "error",
                            title: "Error",
                            message: 'Número de la opción del chatbot ya existe.',
                            btnOk: "Aceptar",
                            fnOk: () => { },
                            btnCancel: "Cancelar"
                        })
                    })
            }
        } else {
            Alert.show({
                type: "error",
                title: "Advertencia",
                message: "Debe registrar al menos el número,nombre y descripción, para crear la opción del chatbot",
                btnOk: "Aceptar",
                fnOk: () => { },
                btnCancel: "Cancelar"
            })
        }
    };

    return (
        <>
            <Layout>

                <div className="header-page">
                    <h1>Chatbot</h1>

                    <div className="main-card card">

                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        key="submit"
                                        type="primary"
                                        onClick={handleOk}>
                                        Guardar
                                    </Button>

                                </li>
                                <li>
                                    <Button href={"/chatbot"}>Regresar</Button>
                                </li>
                            </ul>
                        </div>
                        <div className="main-card">
                            <Form
                                form={form}
                                layout="vertical">

                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="1. Primer nivel" key="1">

                                        <TabFirstLevel
                                            form={form}
                                            TextArea={TextArea} />

                                    </TabPane>

                                    <TabPane tab="2. Segundo Nivel" key="2">
                                        <TabSecondLevel
                                            secondLevel={secondLevel}
                                            setSecondLevel={setSecondLevel}
                                            TextArea={TextArea}
                                            thirthLevel={thirthLevel} />
                                    </TabPane>

                                    <TabPane tab="3. Tercer Nivel" key="5">

                                        <TabThirthLevel
                                            secondLevel={secondLevel}
                                            thirthLevel={thirthLevel}
                                            setThirthLevel={setThirthLevel}
                                            TextArea={TextArea}
                                        />

                                    </TabPane>
                                </Tabs>
                            </Form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Chatbot
