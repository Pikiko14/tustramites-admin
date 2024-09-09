import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import CommentDialog from './components/CommentDialog'
import ActionTable from '../../components/table/ActionTable'
import Alert from '../../helpers/alert/Alert'

// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const Comment = () => {
    const [listComments, setListComments] = useState([]);
    const [commentDialog, setCommentDialog] = useState();
    const [comment, setComment] = useState();

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'fullname',
            key: 'fullname',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Cargo y Empresa',
            dataIndex: 'position_company',
            key: 'position_company',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Activo',
            dataIndex: 'state',
            key: 'state',
            render: record => <a>{record ? "Si" : "No"}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => handleEditComment(record)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];

    const handleNewComment = () => {
        setComment(null);
        setCommentDialog({});
    }

    const handleEditComment = (comment) => {
        setComment(comment);
        setCommentDialog({ comment });
    }

    const alertShow = (comment) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar este comentario?",
            btnOk: "Aceptar",
            fnOk: () => { deleteComment(comment) },
            btnCancel: "Cancelar",
            fnCancel: () => { }
        })
    }

    const deleteComment = async (comment) => {

        const response = await HttpClient.delete('/api/comment/' + comment._id);
        if (response.status == 200) {
            getComments();
        }
    }

    const callbackComment = () => {
        getComments();
        setCommentDialog(null);
    }

    const getComments = async () => {
        const response = await HttpClient.get('/api/comment');
        if (response.status == 200) {
            setListComments(response.data);
        }
    }

    useEffect(() => {
        getComments();
    }, [])

    return (
        <>
            <CommentDialog
                comment={comment}
                data={commentDialog}
                setData={setCommentDialog}
                callback={callbackComment}
            />
            <Layout>
                <div className="header-page">
                    <h1>Comentarios</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        onClick={() => handleNewComment()}
                                    >
                                        Crear Comentario
                                    </Button>
                                </li>
                                <li>
                                    <UndoOutlined />
                                </li>
                            </ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listComments} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Comment
