import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Tabs } from 'antd'
import queryString from 'query-string'

import HttpClient from '../../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../../components/layout/Layout'
import NotarialActDialog from './modal/NotarialActDialog'
import TabHeader from './tab/TabHeader'
import TabActors from './tab/TabActors'
import TabDocuments from './tab/TabDocuments'
import TabAditionalInfo from './tab/TabAditionalInfo'
import Alert from '../../../helpers/alert/Alert'

const NotarialAct = (props) => {

    const [notarialAct, setNotarialAct] = useState();
    const [listActors, setListActors] = useState([]);
    const [listActorsAdd, setListActorsAdd] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [listInputs, setListInpunts] = useState([]);
    const [selectedActor, setSelectedActor] = useState();
    const [tableAux, setTableAux] = useState();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [notarialActDialog, setNotarialActDialog] = useState();
    const [documents, setDocuments] = useState([]);
    const [pages, setPages] = useState([]);
    const { TabPane } = Tabs;



    const callbackNotarialAct = () => {

        props.history.push('/notarial-act/view');
    }



    const loadActors = async () => {
        const response = await HttpClient.get('/api/actor');
        if (response.status == 200) {
            setListActors(response.data);
        }
    }

    const loadCategories = async () => {
        const response = await HttpClient.get('/api/category');
        if (response.status == 200) {
            setListCategories(response.data);
        }
    }

    const loadInputs = async () => {
        const response = await HttpClient.get('/api/input/');
        if (response.status == 200) {
            setListInpunts(response.data);
        }
    }

    const loadValues = async (id) => {

        const response = await HttpClient.get('/api/notarialact/' + id);
        if (response.status == 200) {
            console.log(response.data)
            setNotarialAct(response.data);
            let data = {
                name: response.data.name,
                category: response.data.category && response.data.category.name,
                description: response.data.description,
                time_delivery: response.data.time_delivery,
                duration: response.data.duration,
                document_result: response.data.document_result,
                notary: response.data.notary,
                payment: response.data.payment,
                date: response.data.date,
                note: response.data.note,
                note_2: response.data.note_2,
                page: response.data.page && response.data.page._id
            }
            form.setFieldsValue(data);
            setTableAux(response.data.form);
            setListActorsAdd(response.data.actors);
            setDocuments(response.data.documents);

        }
    }

    const loadPages = async () => {

        const response = await HttpClient.get('/api/page');
        if (response.status == 200) {
            setPages(response.data);
        }
    }

    useEffect(() => {
        form.resetFields();
        loadActors();
        loadCategories();
        loadInputs();
        loadPages();

        let { id } = queryString.parse(props.location.search);
        if (id) {
            loadValues(id);
        }
    }, [])

    const handleOk = async () => {
        if (documents.length > 0) {
            if (form.getFieldValue('page')) {
                if (notarialAct) {
                    const response = await HttpClient.put('/api/notarialact/' + notarialAct._id, {
                        name: form.getFieldValue('name'),
                        category: listCategories.find(category => (category.name === form.getFieldValue('category') || category._id === form.getFieldValue('category')))._id,
                        description: form.getFieldValue('description'),
                        form: tableAux ? tableAux : {},
                        actors: listActorsAdd,
                        documents: documents,
                        notary: (form.getFieldValue('notary') ? form.getFieldValue('notary') : false),
                        payment: (form.getFieldValue('payment') ? form.getFieldValue('payment') : false),
                        document_result: form.getFieldValue('document_result'),
                        date: (form.getFieldValue('date') ? form.getFieldValue('date') : false),
                        time_delivery: form.getFieldValue('time_delivery'),
                        duration: form.getFieldValue('duration'),
                        note: form.getFieldValue('note'),
                        note_2: form.getFieldValue('note_2'),
                        page: form.getFieldValue('page'),
                    });
                    if (response.status == 200) {

                        form.setFieldsValue(null)
                        callbackNotarialAct();
                    }
                } else {
                    const response = await HttpClient.post('/api/notarialact', {
                        name: form.getFieldValue('name'),
                        category: listCategories.find(category => (category.name === form.getFieldValue('category') || category._id === form.getFieldValue('category')))._id,
                        description: form.getFieldValue('description'),
                        form: tableAux ? tableAux : {},
                        actors: listActorsAdd,
                        documents: documents,
                        notary: (form.getFieldValue('notary') ? form.getFieldValue('notary') : false),
                        payment: (form.getFieldValue('payment') ? form.getFieldValue('payment') : false),
                        document_result: form.getFieldValue('document_result'),
                        date: (form.getFieldValue('date') ? form.getFieldValue('date') : false),
                        time_delivery: form.getFieldValue('time_delivery'),
                        duration: form.getFieldValue('duration'),
                        note: form.getFieldValue('note'),
                        note_2: form.getFieldValue('note_2'),
                        page: form.getFieldValue('page'),
                    });
                    if (response.status == 201) {
                        form.setFieldsValue(null)
                        callbackNotarialAct();
                    }
                }
            } else {
                Alert.show({
                    type: "error",
                    title: "Advertencia",
                    message: "Debe seleccionar una politica y tratamiento de datos para este acto notarial.",
                    btnOk: "Aceptar",
                    fnOk: () => { },
                    btnCancel: "Cancelar"
                })
            }
        } else {
            Alert.show({
                type: "error",
                title: "Advertencia",
                message: "Debe existir al menos un documento para que se cree el acto notarial",
                btnOk: "Aceptar",
                fnOk: () => { },
                btnCancel: "Cancelar"
            })
        }
    };

    return (
        <>

            <NotarialActDialog
                name={form.getFieldValue('name')}
                category={listCategories.find(category => (category.name === form.getFieldValue('category') || category._id === form.getFieldValue('category')))}
                description={form.getFieldValue('description')}
                tableAux={tableAux}
                listActorsAdd={listActorsAdd}
                notarialAct={notarialAct}
                data={notarialActDialog}
                setData={setNotarialActDialog}
                callback={callbackNotarialAct}
            />
            <Layout>

                <div className="header-page">
                    <h1>Acto Notarial</h1>

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
                                    <Button href={"/notarial-act/view"}>Regresar</Button>
                                </li>
                            </ul>
                        </div>
                        <div className="main-card">
                            <Form
                                form={form}
                                layout="vertical">

                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="1. Encabezado" key="1">

                                        <TabHeader
                                            form={form}
                                            listCategories={listCategories}
                                            TextArea={TextArea} />

                                    </TabPane>

                                    <TabPane tab="2. Actores" key="2">
                                        <TabActors
                                            form={form}
                                            listActors={listActors}
                                            listActorsAdd={listActorsAdd}
                                            tableAux={tableAux}
                                            listInputs={listInputs}
                                            setListActorsAdd={setListActorsAdd}
                                            setSelectedActor={setSelectedActor}
                                            selectedActor={selectedActor}
                                            setTableAux={setTableAux} />
                                    </TabPane>

                                    <TabPane tab="3. Documentos" key="5">

                                        <TabDocuments
                                            form={form}
                                            TextArea={TextArea}
                                            setDocuments={setDocuments}
                                            documents={documents}
                                        />

                                    </TabPane>

                                    <TabPane tab="4. Información Adicional" key="6">

                                        <TabAditionalInfo
                                            form={form}
                                            pages={pages}
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

export default NotarialAct
