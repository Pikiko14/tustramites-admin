import React,{useState} from 'react'
import { Form, Input, Select, Checkbox, Button} from 'antd'
import Alert from '../../../../helpers/alert/Alert'
import DataTable from '../../../../components/table/DataTable'
import ActionTable from '../../../../components/table/ActionTable'

const TabDocuments = ({ form, TextArea, setDocuments, documents }) => {
    
    const [groups, setGroups] = useState([]);

    const handleAddGroup = () => {

        if (form.getFieldValue('group') != '') {
            let newArr = [...groups];
            let data = {
                name: form.getFieldValue('group')
            }
            newArr.push(data);
            setGroups(newArr);
            data = { group: '' };
            form.setFieldsValue(data);
        } else {
            Alert.show({
                type: "warning",
                title: "Advertencia",
                message: "El nombre del grupo no puede estar vacio",
                btnOk: "Aceptar",
                fnOk: () => { },
                btnCancel: "Cancelar"
            })

        }

    }

    const handleAddDocument = () => {

        if (form.getFieldValue('document') && form.getFieldValue('group_sel')) {
            let newArr = [...documents];
            let data = {
                group: form.getFieldValue('group_sel'),
                name: form.getFieldValue('document'),
                required: form.getFieldValue('required')?form.getFieldValue('required'):false
            }
            newArr.push(data);
            setDocuments(newArr);
            data = { document: '', required: false };
            form.setFieldsValue(data);
        } else {
            Alert.show({
                type: "warning",
                title: "Advertencia",
                message: "El nombre del documento y grupo son obligatorios",
                btnOk: "Aceptar",
                fnOk: () => { },
                btnCancel: "Cancelar"
            })
        }

    }

    const deleteDocument = (data) => {

        let newArr = [...documents];

        for (let i = 0; i < newArr.length; i++) {

            if (newArr[i].name === data.name) {

                newArr.splice(i, 1);
                setDocuments(newArr);
            }
        }
    }

    const deleteGroup = (data) => {

        let newArr = [...groups];

        for (let i = 0; i < newArr.length; i++) {

            if (newArr[i].name === data.name) {

                newArr.splice(i, 1);
                setGroups(newArr);
            }
        }

        newArr = [...documents];

        for (let i = 0; i < newArr.length; i++) {

            if (newArr[i].group === data.name) {

                newArr.splice(i, 1);
                setDocuments(newArr);
            }
        }
    }

    const columnsDocument = [
        {
            title: 'Grupo',
            dataIndex: 'group',
            key: 'group',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Obligatorio',
            dataIndex: 'required',
            key: 'required',
            render: (text, record) => <a>{record.required ? 'Si' : 'No'}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleDelete={() => deleteDocument(record)}
                />
            ),
        }
    ];

    const columnsGroup = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleDelete={() => deleteGroup(record)}
                />
            ),
        }
    ];

    return (
        <>
            <Form.Item
                label="Grupos">

                <Form.Item
                    label="Nombre grupo"
                    name="group"
                    id="group"
                >
                    <Input />
                </Form.Item>

                <Button onClick={() => handleAddGroup()}> Agregar</Button>

                <div className="main-card-table">
                    <DataTable columns={columnsGroup} data={groups} />
                </div>
            </Form.Item>

            <Form.Item
                label="Documentos">

                <Form.Item
                    name="group_sel"
                    id="group_sel"
                    label="Grupos"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Seleccione un grupo"
                        allowClear
                    >
                        {
                            groups.map((item, i) => (

                                <option key={i} value={item.name}>{item.name}</option>

                            ))
                        }

                    </Select>
                </Form.Item>

                <Form.Item
                    label="Nombre"
                    name="document"
                    id="document"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese el nombre del documento!',
                        },
                        {
                            min: 5,
                            message: 'El nombre del ducumento, debe tener al menos 5 caracteres!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="required"
                    valuePropName="checked"
                    id="required"
                >
                    <Checkbox>Obligatorio</Checkbox>
                </Form.Item>

                <Button onClick={() => handleAddDocument()}> Agregar</Button>

            </Form.Item>

            <div className="main-card-table">
                <DataTable columns={columnsDocument} data={documents} />
            </div>

            <Form.Item
                label="Nota 2"
                name="note_2"
                id="note_2"
            >
                <TextArea
                    autoSize
                    placeholder="Ingrese la nota"
                />

            </Form.Item>
        </>
    )
}

export default TabDocuments
