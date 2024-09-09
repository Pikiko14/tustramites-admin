import React, { useState } from 'react'
import { Checkbox, Row, Form, Select, Button } from 'antd'
import ActionTable from '../../../components/table/ActionTable';
import DataTable from '../../../components/table/DataTable';
import Alert from '../../../helpers/alert/Alert'

const Schedule = ({ form, setSchedules, schedules }) => {

    const [disabled, setDisabled] = useState(false);

    const hours = ["6:00", , "7:00", "8:00", "9:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00"];

    const columns = [
        {
            title: 'Días',
            dataIndex: 'days',
            key: 'days',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Hora Inicio',
            dataIndex: 'startHour',
            key: 'startHour',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Hora Fin',
            dataIndex: 'endHour',
            key: 'endHour',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleDelete={() => deleteItem(record)}
                />
            ),
        }
    ];

    const saveSchedule = () => {
        if (!form.getFieldValue('lunes') && !form.getFieldValue('martes')
            && !form.getFieldValue('miercoles') && !form.getFieldValue('jueves')
            && !form.getFieldValue('viernes') && !form.getFieldValue('sabado')
            && !form.getFieldValue('lunes_viernes')) {
            showAlert();
        } else if (!form.getFieldValue('startHour') || !form.getFieldValue('endHour')) {
            showAlert();
        } else {
            var schedule = new Object();
            var days = "";
            var hours = {};
            if (form.getFieldValue('lunes_viernes'))
                days += 'lunes-martes-miercoles-jueves-viernes-sabado'
            else {
                if (form.getFieldValue('lunes'))
                    days += 'lunes-';
                if (form.getFieldValue('martes'))
                    days += 'martes-';
                if (form.getFieldValue('miercoles'))
                    days += 'miercoles-';
                if (form.getFieldValue('jueves'))
                    days += 'jueves-'
                if (form.getFieldValue('viernes'))
                    days += 'viernes-'
            }
            if (form.getFieldValue('sabado'))
                days += 'sabado'

            hours.startHour = form.getFieldValue('startHour');
            hours.endHour = form.getFieldValue('endHour');

            schedule.days = days;
            schedule.startHour = form.getFieldValue('startHour');
            schedule.endHour = form.getFieldValue('endHour');

            var schedulesAux = [...schedules];
            schedulesAux.push(schedule);
            setSchedules(schedulesAux);

            let data = {
                lunes: false,
                martes: false,
                miercoles: false,
                jueves: false,
                viernes: false,
                sabado: false,
                startHour: undefined,
                endHour: undefined
            }
            form.setFieldsValue(data);
        }
    }

    const showAlert = () => {
        Alert.show({
            type: "error",
            title: "Error",
            message: "Hay campos necesarios que no se han diligenciado.",
            btnOk: "Aceptar",
            fnOk: () => { },
            btnCancel: "Cancelar"
        })
    }

    const deleteItem = (item) => {
        let newArr = [...schedules];
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].days === item.days && newArr[i].startHour === item.startHour
                && newArr[i].endHour === item.endHour) {
                newArr.splice(i, 1);
                setSchedules(newArr);
            }
        }
    }

    const handleChange = () => {
        if (form.getFieldValue("lunes_viernes")) {
            setDisabled(true);
        }else{
            setDisabled(false);
        }
    }

    return (
        <>
            <Row>
                <Form.Item
                    label="Horario:"
                    name="lunes"
                    valuePropName="checked"
                    id="lunes"
                >
                    <Row>
                        <Form.Item
                            name="lunes"
                            valuePropName="checked"
                            id="lunes"
                        >
                            <Checkbox disabled={disabled}>Lunes</Checkbox>
                        </Form.Item>

                        <Form.Item
                            name="martes"
                            valuePropName="checked"
                            id="martes"
                        >
                            <Checkbox disabled={disabled}>Martes</Checkbox>
                        </Form.Item>
                        <Form.Item
                            name="miercoles"
                            valuePropName="checked"
                            id="miercoles"
                        >
                            <Checkbox disabled={disabled}>Miércoles</Checkbox>
                        </Form.Item>
                        <Form.Item
                            name="jueves"
                            valuePropName="checked"
                            id="jueves"
                        >
                            <Checkbox disabled={disabled}>Jueves</Checkbox>
                        </Form.Item>
                        <Form.Item
                            name="viernes"
                            valuePropName="checked"
                            id="viernes"
                        >
                            <Checkbox disabled={disabled}>Viernes</Checkbox>
                        </Form.Item>

                        <Form.Item
                            name="sabado"
                            valuePropName="checked"
                            id="sabado"
                        >
                            <Checkbox>Sábado</Checkbox>
                        </Form.Item>

                        <Form.Item
                            name="lunes_viernes"
                            valuePropName="checked"
                            id="lunes_viernes"
                        >
                            <Checkbox onChange={handleChange}>Lunes-Viernes</Checkbox>
                        </Form.Item>
                    </Row>

                    <Row>
                        <Form.Item>
                            <Form.Item
                                name="startHour"
                                id="startHour"
                                label="Hora inicio"
                                rules={[
                                    {
                                        required: true,
                                        message: "La hora de inicio es requerida"
                                    },
                                ]}
                                hasFeedback>
                                <Select
                                    placeholder="Hora inicio"
                                    //onChange={handleChangeProvince}
                                    allowClear
                                >
                                    {hours.map((hour, i) => (
                                        <option key={i} value={hour}>{hour}</option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Form.Item>
                    </Row>

                    <Row>
                        <Form.Item>
                            <Form.Item
                                name="endHour"
                                id="endHour"
                                label="Hora fin"
                                rules={[
                                    {
                                        required: true,
                                        message: "La hora fin es requerida"
                                    },
                                ]}
                                hasFeedback>
                                <Select
                                    placeholder="Hora fin"
                                    //onChange={handleChangeProvince}
                                    allowClear
                                >
                                    {hours.map((hour, i) => (
                                        <option key={i} value={hour}>{hour}</option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Form.Item>

                    </Row>


                    <Row>
                        <Button
                            onClick={() => saveSchedule()}
                        >
                            Guardar Horario
                        </Button>
                    </Row>
                </Form.Item>
            </Row>


            <div className="main-card-table">
                <DataTable columns={columns} data={schedules} />
            </div>

        </>
    )
}

export default Schedule
