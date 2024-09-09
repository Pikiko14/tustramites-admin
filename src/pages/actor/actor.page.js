import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import ActionTable from '../../components/table/ActionTable'

import ActorDialog from './components/form/ActorDialog'
import Alert from '../../helpers/alert/Alert'

// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const ActorPage = () => {

    const [listActors, setListActors] = useState([]);
    const [actorDialog, setActorDialog] = useState();
    const [actor, setActor] = useState();

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <>{text}</>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            width: '10%',
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => handleEditActor(record)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];

    const handleNewActor = () => {
        setActor(null);
        setActorDialog({});
    }

    const handleEditActor = (actor) => {
        setActor(actor);
        setActorDialog({ actor });
    }

    const alertShow = (actor) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar este actor?",
            btnOk: "Aceptar",
            fnOk: () => { deleteActor(actor) },
            btnCancel: "Cancelar",
            fnCancel: () => {}
        })
    }

    const deleteActor = async (actor) => {
        const response = await HttpClient.delete('/api/actor/' + actor._id);
        if (response.status == 200) {
            getActors();
        }
    }

    const callbackActor = () => {
        getActors();
        setActorDialog(null);
    }

    const getActors = async () => {
        const response = await HttpClient.get('/api/actor');
        if (response.status == 200) {
            setListActors(response.data);
        }
    }

    useEffect(() => {
        getActors();
    }, [])

    return (
        <>
            <ActorDialog
                actor={actor}
                data={actorDialog}
                setData={setActorDialog}
                callback={callbackActor}
            />
            <Layout>
                <div className="header-page">
                    <h1>Actores</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        onClick={() => handleNewActor()}
                                    >
                                        Crear Actor
                                    </Button>
                                </li>
                                <li>
                                    <UndoOutlined />
                                </li>
                            </ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listActors} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ActorPage
