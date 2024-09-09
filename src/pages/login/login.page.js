import React, { useContext } from 'react'
import { Form, Input, Button } from 'antd';
import HttpClient from '../../helpers/network/HttpClient'

// CONTEXT 
import AuthContext from '../../context/AuthContext';

//ALERT
import Alert from '../../helpers/alert/Alert'

// COOKIE
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Login = (props) => {

    const [form] = Form.useForm();
    const { updateUser } = useContext(AuthContext);

    const login = async (value) => {
        const response = await HttpClient.post('/api/user/login', value);

        if (response.status == 200) {
            cookies.set('token', response.data.token);
            updateUser(response.data.user);
            window.location.href = "/";
        } else if (response.status == 400) {
            Alert.show({
                type: "",
                title: "Error",
                message: "Email y/o contraseña no coinciden con alguna cuenta registrada, revise y vuelva a intentar.",
                btnOk: "Aceptar",
                fnOk: () => { form.resetFields() },
                btnCancel: "Cancelar",
                fnCancel: null
            })
        }

    }

    const handleLogin = (value) => {
        login(value);
    }

    return (
        <div className="login" style={{ backgroundImage: "url(/assets/images/back.jpeg)" }}>
            <div className="login-content">
                <div className="login-back" />
                <div className="login-logo">
                    <img src="/assets/logo/logo.svg"></img>
                </div>
                <div className="login-panel">

                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={handleLogin}>

                        <h3>INGRESO SEGURO</h3>
                        <p className="subtitle">Bienvenido al panel de administración</p>
                        <div className="form-control">
                            <Form.Item
                                name="email"
                                id="email"
                                label="Usuario:"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        type: "email",
                                        message: 'Por favor ingrese un correo electronico!',
                                    }
                                ]}
                            >
                                <Input placeholder="example@example.com" type="email" />
                            </Form.Item>

                        </div>


                        <div className="form-control">
                            <Form.Item
                                name="password"
                                id="password"
                                label="Contraseña:"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese la contraseña!',
                                    }
                                ]}
                            >
                                <Input.Password placeholder="Ingrese la contraseña." />
                            </Form.Item>
                        </div>
                        <div className="form-action">
                            <Button htmlType="submit">Ingresar</Button>
                        </div>
                        <div className="autor">
                            <p>Power By <img src="/assets/images/tingenio.png"></img></p>
                            <p>Todos los derechos de autor reservados.</p>
                            <p>Colombia 2021</p>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login
