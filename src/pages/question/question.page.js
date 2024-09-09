import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import QuestionDialog from './components/QuestionDialog'
import ActionTable from '../../components/table/ActionTable'
import Alert from '../../helpers/alert/Alert'


// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const Question = () => {
    const [listQuestions, setListQuestions] = useState([]);
    const [questionDialog, setQuestionDialog] = useState();
    const [question, setQuestion] = useState();

    const columns = [
        {
            title: 'Pregunta',
            dataIndex: 'question',
            key: 'question',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Respuesta',
            dataIndex: 'answer',
            key: 'answer',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            key: 'category',
            render: record => <a>{record.name}</a>,
        },
        {
            title: 'Subcategoría',
            dataIndex: 'subcategory',
            key: 'subcategory',
            render: record => <a>{record.name}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => handleEditQuestion(record)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];

    const handleNewQuestion = () => {
        setQuestion(null);
        setQuestionDialog({});
    }

    const handleEditQuestion = (question) => {
        setQuestion(question);
        setQuestionDialog({ question });
    }

    const alertShow = (question) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar esta pregunta?",
            btnOk: "Aceptar",
            fnOk: () => { deleteQuestion(question) },
            btnCancel: "Cancelar",
            fnCancel: () => { }
        })
    }    

    const deleteQuestion = async (question) => {

        const response = await HttpClient.delete('/api/question/' + question._id);
        if (response.status == 200) {
            getQuestions();
        }
    }

    const callbackQuestion = () => {
        getQuestions();
        setQuestionDialog(null);
    }

    const getQuestions = async () => {
        const response = await HttpClient.get('/api/question');
        if (response.status == 200) {
            setListQuestions(response.data);
        }
    }

    useEffect(() => {
        getQuestions();
    }, [])

    return (
        <>
            <QuestionDialog
                question={question}
                data={questionDialog}
                setData={setQuestionDialog}
                callback={callbackQuestion}
            />
            <Layout>
                <div className="header-page">
                    <h1>Preguntas frecuentes</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        onClick={() => handleNewQuestion()}
                                    >
                                        Crear pregunta
                                    </Button>
                                </li>
                                <li>
                                    <UndoOutlined />
                                </li>
                            </ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listQuestions} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export default Question
