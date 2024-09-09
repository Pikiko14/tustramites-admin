import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import DataTable from '../../../../components/table/DataTable'
import ActionTable from '../../../../components/table/ActionTable'
import Alert from '../../../../helpers/alert/Alert'

const TabSecondLevel = ({ secondLevel, setSecondLevel, TextArea, thirthLevel }) => {

    const [forms] = Form.useForm();
    const [edit, setEdit] = useState(false);

    const columns = [
        {
            title: 'Número',
            dataIndex: 'key',
            key: 'key',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Titulo',
            dataIndex: 'title',
            key: 'title',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
            render: text => <a>{text}</a>,
        },
        {
            title: '¿Chat en Whatsapp?',
            dataIndex: 'whatsapp',
            key: 'whatsapp',
            render: record => <a>{record ? "Si" : "No"}</a>,
        },
        {
            title: 'Estado',
            dataIndex: 'state',
            key: 'state',
            render: record => <a>{record ? "Activo" : "Inactivo"}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleEdit={() => modifiedLevel(record, 'edit')}
                    handleDelete={() => modifiedLevel(record, 'delete')}
                />
            )
        }
    ];

    const modifiedLevel = async (item, type) => {
        let newArr = [...secondLevel];
        let position = 999999;
        for (let index = 0; index < newArr.length; index++) {
            if (newArr[index].title == item.title) {
                position = index
                break
            }
        }

        if (type == 'edit') {
            let data = {
                key: item.key,
                title: item.title,
                description: item.description,
                whatsapp: item.whatsapp,
                state: item.state
            }
            setEdit(true)
            forms.setFieldsValue(data)
        }

        if (type == 'delete') {
            let finded = thirthLevel.find((element) => element.secondLevel == item.title)
            if (finded) {
                Alert.show({
                    type: "error",
                    title: "Error",
                    message: "Elemento no puede ser eliminado, ya que se encuentra asociado en la data de tercer nivel.",
                    btnOk: "Aceptar",
                    fnOk: () => { },
                    btnCancel: "Cancelar"
                })
            } else {
                newArr.splice(position, 1)
                setSecondLevel(newArr);
            }
        }

    }

    const handleAdd = () => {
        let key = forms.getFieldValue('key')
        let title = forms.getFieldValue('title')
        let description = forms.getFieldValue('description')
        let whatsapp = forms.getFieldValue('whatsapp') || false
        let state = forms.getFieldValue('state') || false

        let finded = undefined
        if (key != '' && title != '' && description != '') {
            let newArr = [...secondLevel];
            let data = {
                key: key,
                title: title,
                description: description,
                whatsapp: whatsapp,
                state: state
            }
            if (edit) {
                let position = 999999;
                for (let index = 0; index < newArr.length; index++) {
                    if (newArr[index].title == title) {
                        position = index
                        break
                    }
                }
                newArr[position] = data
            } else {
                finded = secondLevel.find((element) => element.key == key)
                if (finded) {
                    Alert.show({
                        type: "error",
                        title: "Error",
                        message: "Elemento no puede ser añadido, ya se encuentra una opción con ese número.",
                        btnOk: "Aceptar",
                        fnOk: () => { },
                        btnCancel: "Cancelar"
                    })
                } else {
                    newArr
                        .push(data);
                }
            }
            if (!finded) {
                setSecondLevel(newArr);
                data = {
                    key: '',
                    title: '',
                    description: '',
                    whatsapp: false,
                    state: false
                }
                forms.setFieldsValue(data)
                setEdit(false)
            }
        }
    }

    return (
        <>
            <Form
                form={forms}
                layout="vertical">
                <Form.Item
                    style={{
                        display: 'flex'
                    }}>
                    <Form.Item
                        label="Número"
                        name="key"
                        id="key"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese el número!',
                            },
                            {
                                min: 1,
                                message: 'El número debe tener al menos 1 digito!',
                            },
                            {
                                max: 2,
                                message: 'El número debe tener máximo 2 digitos!',
                            }
                        ]}
                    >
                        <Input type="number" placeholder="Ingrese el número de la opción del chatbot" disabled={edit} />
                    </Form.Item>
                    <Form.Item
                        label="Título"
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
                            {
                                max: 80,
                                message: 'El titulo debe tener maximo 80 caracteres!',
                            },
                        ]}
                    >
                        <Input placeholder="Ingrese el título de la opción del chatbot" />
                    </Form.Item>

                    <Form.Item
                        label="Descripción"
                        name="description"
                        id="description"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese la descripción!',
                            },
                            {
                                min: 10,
                                message: 'La descripción debe tener al menos 10 caracteres!',
                            },
                        ]}
                    >
                        <TextArea
                            placeholder="Ingrese una descripción"
                            rows={2}
                            autoSize={{ minRows: 1, maxRows: 3 }}
                            maxLength={400}
                            showCount={true}
                        />
                    </Form.Item>
                    <Form.Item
                        name="whatsapp"
                        valuePropName="checked"
                        id="whatsapp"
                    >
                        <Checkbox>¿Comunicación por whatsapp?</Checkbox>
                    </Form.Item>

                    <Form.Item
                        name="state"
                        valuePropName="checked"
                        id="state"
                    >
                        <Checkbox>¿Activo?</Checkbox>
                    </Form.Item>
                    <Button onClick={() => handleAdd()}> Agregar</Button>
                </Form.Item>
            </Form>
            <div className="main-card-table">
                <DataTable columns={columns} data={secondLevel} />
            </div>
        </>
    )
}

export default TabSecondLevel