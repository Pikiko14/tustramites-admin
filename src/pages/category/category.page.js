import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import CategoryDialog from './components/CategoryDialog'
import ActionTable from '../../components/table/ActionTable'
import Alert from '../../helpers/alert/Alert'


// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const Category = () => {
    const [listCategories, setListCategories] = useState([]);
    const [categoryDialog, setCategoryDialog] = useState();
    const [category, setCategory] = useState();

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            //render: text => <a>{text}</a>,
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => handleEditCategory(record)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];

    const handleNewCategory = () => {
        setCategory(null);
        setCategoryDialog({});
    }

    const handleEditCategory = (category) => {
        setCategory(category);
        setCategoryDialog({ category });
    }

    const alertShow = (category) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar esta categoria?",
            btnOk: "Aceptar",
            fnOk: () => { deleteCategory(category) },
            btnCancel: "Cancelar",
            fnCancel: () => {}
        })
    }

    const deleteCategory = async (category) => {

        const response = await HttpClient.delete('/api/category/' + category._id);
        if (response.status == 200) {
            getCategories();
        }
    }

    const callbackCategory = () => {
        getCategories();
        setCategoryDialog(null);
    }

    const getCategories = async () => {
        const response = await HttpClient.get('/api/category');
        if (response.status == 200) {
            setListCategories(response.data);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <>
            <CategoryDialog
                category={category}
                data={categoryDialog}
                setData={setCategoryDialog}
                callback={callbackCategory}
            />
            <Layout>
                <div className="header-page">
                    <h1>Categorías</h1>
                    <h3>Agrega la categoria principal de los trámites. Ejemplo (Familia, Inmobiliario, etc)</h3>
                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        onClick={() => handleNewCategory()}
                                    >
                                        Crear Categoría
                                    </Button>
                                </li>
                                <li>
                                    <UndoOutlined />
                                </li>
                            </ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listCategories} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export default Category
