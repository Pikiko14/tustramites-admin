import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import SubcategoryQuestionDialog from './components/SubcategoryQuestionDialog'
import ActionTable from '../../components/table/ActionTable'
import Alert from '../../helpers/alert/Alert'


// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const SubcategoryQuestion = () => {
    const [listsubCategories, setListSubcategories] = useState([]);
    const [subcategoryDialog, setsubCategoryDialog] = useState();
    const [subcategory, setSubCategory] = useState();

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            key: 'category',
            render: (text, record) => <a>{record.category.name}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            //render: text => <a>{text}</a>,
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => handleEditSubcategory(record)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];

    const handleNewSubcategory = () => {
        setSubCategory(null);
        setsubCategoryDialog({});
    }

    const handleEditSubcategory = (subcategory) => {
        setSubCategory(subcategory);
        setsubCategoryDialog({ subcategory });
    }

    const alertShow = (subcategory) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar esta subcategoría?",
            btnOk: "Aceptar",
            fnOk: () => { deleteSubCategory(subcategory) },
            btnCancel: "Cancelar",
            fnCancel: () => { }
        })
    }

    const deleteSubCategory = async (subcategory) => {

        const response = await HttpClient.delete('/api/subcategoryquestion/' + subcategory._id);
        if (response.status == 200) {
            getSubCategories();
        }
    }

    const callbackSubCategory = () => {
        getSubCategories();
        setsubCategoryDialog(null);
    }

    const getSubCategories = async () => {
        const response = await HttpClient.get('/api/subcategoryquestion');
        if (response.status == 200) {
            setListSubcategories(response.data);
        }
    }

    useEffect(() => {
        getSubCategories();
    }, [])

    return (
        <>
            <SubcategoryQuestionDialog
                subcategory={subcategory}
                data={subcategoryDialog}
                setData={setsubCategoryDialog}
                callback={callbackSubCategory}
            />
            <Layout>
                <div className="header-page">
                    <h1>Subcategorías de preguntas</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        onClick={() => handleNewSubcategory()}
                                    >
                                        Crear Subcategoría de Pregunta
                                    </Button>
                                </li>
                                <li>
                                    <UndoOutlined />
                                </li>
                            </ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listsubCategories} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export default SubcategoryQuestion
