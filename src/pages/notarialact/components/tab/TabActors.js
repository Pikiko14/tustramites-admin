import React,{useState} from 'react'
import { Form, Select, Checkbox, Button, Space } from 'antd'
import DataTable from '../../../../components/table/DataTable'
import DataTableInput from '../DataTableNoratialAct'
// ICON
import {
    DeleteOutlined
} from '@ant-design/icons'

const TabActors = ({ form, listActors,listActorsAdd, tableAux, listInputs,
    setListActorsAdd, setSelectedActor,selectedActor, setTableAux
}) => {

    const [selectedInput, setSelectedInput] = useState();    
    const [selectedIterative, setSelectedIterative] = useState(false);
    
    const columnsActor = [
        {
            title: 'Actor',
            dataIndex: 'actor',
            key: 'actor',
            render: (text, record) => <a>{record.actor.name}</a>,
        },
        {
            title: 'Iterativo',
            dataIndex: 'iterative',
            key: 'iterative',
            render: (text, record) => <a>{record.iterative ? 'Si' : 'No'}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a className="action-delete" onClick={() => deleteActor(record)}>
                        <DeleteOutlined />
                    </a>
                </Space>
            ),
        }
    ];

    const handleChangeSelect = (value) => {
        var actor = listActors.find(actor => actor._id === value);
        setSelectedActor(actor);
    }

    const handleAddActors = () => {
        if (selectedActor) {
            let newArr = [...listActorsAdd];
            let data = {
                actor: selectedActor,
                iterative: selectedIterative
            }
            newArr.push(data);
            setListActorsAdd(newArr);
            data = {
                selActor: '',
                iterative: false,
            }
            form.setFieldsValue(data)

            if (tableAux) {
                Object.keys(tableAux).map((item, i) => {
                    if (tableAux[item]['input'].actor) {
                        tableAux[item]['actors'][selectedActor.name] = {
                            iterative: selectedIterative,
                            checked: true
                        };
                    }
                })
            }
            setSelectedActor(null);
        }
    }

    const deleteActor = (data) => {

        let newArr = [...listActorsAdd];

        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].actor === data.actor && newArr[i].iterative === data.iterative) {
                newArr.splice(i, 1);
                setListActorsAdd(newArr);
            }
        }

        if (tableAux) {
            Object.keys(tableAux).map((item, i) => {
                if (tableAux[item]['input'].actor) {
                    delete tableAux[item]['actors'][data.actor.name];
                }
            })
        }
    }

    const handleChangeSelectInput = (value) => {
        var input = listInputs.find(input => input._id === value);
        setSelectedInput(input);
    }

    const handleAddInputs = () => {
        let input = selectedInput;

        var formObject = {};
        formObject = Object.assign(formObject, tableAux);

        if (!formObject[input._id])
            formObject[input._id] = {
                input: input
            };

        if (input.actor) {
            formObject[input._id]['actors'] = {};
            listActorsAdd.map((item) => {
                formObject[input._id]['actors'][item.actor.name] = {
                    iterative: item.iterative,
                    checked: true
                };
            })
        }
        setTableAux(formObject);
    }

    const setChecked = (input, actor) => {
        var formObject = {};
        formObject = Object.assign(formObject, tableAux);

        if (formObject[input]['actors'][actor]['checked'])
            formObject[input]['actors'][actor]['checked'] = false;
        else
            formObject[input]['actors'][actor]['checked'] = true;

        setTableAux(formObject);
    }

    const deleteInput = (item, i) => {
        let newArr = Object.assign({}, tableAux, tableAux);
        delete newArr[item];
        setTableAux(newArr);
    }

    return (
        <>
            <Form.Item
                label="Actores"
                style={{
                    display: 'flex'
                }}>

                <Form.Item
                    id="selActor"
                    name="selActor">

                    <Select
                        placeholder="Seleccione un actor"
                        onChange={handleChangeSelect}
                    >
                        {
                            listActors.map((item, i) => (
                                <option key={i} value={item._id}>{item.name}</option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="iterative"
                    valuePropName="checked"
                    id="iterative"
                >
                    <Checkbox onChange={e => setSelectedIterative(e.target.checked)}>Iterativo</Checkbox>
                </Form.Item>
                <Button onClick={() => handleAddActors()}> Agregar</Button>
            </Form.Item>

            <div className="main-card-table">
                <DataTable columns={columnsActor} data={listActorsAdd} />
            </div>


            <Form.Item
                label="Campos">

                <Form.Item>

                    <Select
                        placeholder="Seleccione un campo"
                        onChange={handleChangeSelectInput}
                    >
                        {
                            listInputs.map((item, i) => (
                                <option key={i} value={item._id}>{item.name}</option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Button onClick={() => handleAddInputs()}> Agregar</Button>
            </Form.Item>

            <DataTableInput
                listActorsAdd={listActorsAdd}
                tableAux={tableAux}
                setChecked={setChecked}
                deleteInput={deleteInput}
            />
        </>
    )
}

export default TabActors
