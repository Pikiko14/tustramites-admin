import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

// CONTEXT 
import AuthContext from '../../../../context/AuthContext';

import { Menu } from 'antd'
import Pdf from '../../../../json/tutorial.pdf'

import {
    BankOutlined,
    GlobalOutlined,
    TeamOutlined,
    SolutionOutlined,
    AppstoreOutlined,
    ExceptionOutlined,
    WhatsAppOutlined,
    QuestionOutlined,
    WechatOutlined,
    SettingOutlined,
    NotificationOutlined
} from '@ant-design/icons';

// COOKIE
import Cookies from "universal-cookie";
const cookies = new Cookies();

const { SubMenu } = Menu


const DrawerMenu = () => {

    const history = useHistory();
    const { user } = useContext(AuthContext);

    return (
        <div className="drawer">
            <div className="drawer-logo">
                <img src="/assets/logo/logo-white.svg" />
            </div>
            <nav>
                <>
                    {user && user.role === 'ADMINISTRADOR' ?
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[history.location.pathname]}
                            defaultOpenKeys={[history.location.pathname.split('/')[1]]}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <div className="menu-title">
                                <p>PANEL DE CONTROL</p>
                            </div>
                            <Menu.Item key="/" icon={<AppstoreOutlined />}>
                                Inicio
                            </Menu.Item>

                            <div className="menu-title">
                                <p>TRÁMITES</p>
                            </div>

                            <Menu.Item
                                key="10"
                                icon={<SolutionOutlined />}
                                onClick={() => history.push("/")}>
                                Mis trámites
                            </Menu.Item>

                            <Menu.Item
                                key="/notary"
                                icon={<BankOutlined />}
                                onClick={() => history.push("/notary")}>
                                Notarias
                            </Menu.Item>


                            <SubMenu
                                key='notarial-act'
                                icon={<ExceptionOutlined />}
                                title="Actos Notariales"
                            >

                                <Menu.Item
                                    key="/notarial-act/view"
                                    onClick={() => history.push("/notarial-act/view")}>
                                    · Lista de Actos Notariales
                                </Menu.Item>

                                <SubMenu
                                    key='seb-notarial-act'
                                    icon={<ExceptionOutlined />}
                                    title="Creación Acto Notarial"
                                >
                                    <Menu.Item
                                        key="/notarial-act/category"
                                        onClick={() => history.push("/notarial-act/category")}>
                                        1· Categorías
                                    </Menu.Item>
                                    <Menu.Item
                                        key="/notarial-act/actor"
                                        onClick={() => history.push("/notarial-act/actor")}>
                                        2· Actores
                                    </Menu.Item>
                                    <Menu.Item
                                        key="/notarial-act/input"
                                        onClick={() => history.push("/notarial-act/input")}>
                                        3· Campos Formularios
                                    </Menu.Item>
                                    <Menu.Item
                                        key="/notarial-act/form"
                                        onClick={() => history.push("/notarial-act/form")}>
                                        4· Nuevo Acto Notarial
                                    </Menu.Item>
                                </SubMenu>

                                <Menu.Item
                                    key="/notarial-act/tutorial">
                                    <a href={Pdf} target="_blank" />
                                    ¿Necesitas ayuda?
                                </Menu.Item>

                            </SubMenu>


                            <div className="menu-title">
                                <p>CONFIGURACIÓN</p>
                            </div>

                            <SubMenu
                                key="website"
                                icon={<GlobalOutlined />}
                                title="Web Site"
                            >
                                <SubMenu
                                    key='seb-question'
                                    icon={<QuestionOutlined />}
                                    title="Crear Pregunta"
                                >
                                    <Menu.Item
                                        key="/website/categoryquestion"
                                        onClick={() => history.push("/website/categoryquestion")}
                                    >
                                        · Categorías Pregunta
                                    </Menu.Item>

                                    <Menu.Item
                                        key="/website/subcategoryquestion"
                                        onClick={() => history.push("/website/subcategoryquestion")}
                                    >
                                        · Subcategorías Pregunta
                                    </Menu.Item>
                                    <Menu.Item
                                        key="/website/question"
                                        onClick={() => history.push("/website/question")}
                                    >
                                        · Preguntas frecuentes
                                    </Menu.Item>
                                </SubMenu>

                                <Menu.Item
                                    key="/website/banner"
                                    onClick={() => history.push("/website/banner")}
                                >
                                    · Banner
                                </Menu.Item>

                                <Menu.Item
                                    key="/website/internationalization"
                                    onClick={() => history.push("/website/internationalization")}
                                >
                                    · Internacionalización
                                </Menu.Item>



                                <Menu.Item
                                    key="/website/page"
                                    onClick={() => history.push("/website/page")}
                                >
                                    · Politicas y tratamiento de datos
                                </Menu.Item>

                                <Menu.Item
                                    key="/website/contact"
                                    onClick={() => history.push("/website/contact")}
                                >
                                    · Solicitudes de contacto
                                </Menu.Item>

                                <Menu.Item
                                    key="/website/comment"
                                    onClick={() => history.push("/website/comment")}
                                >
                                    · Comentarios
                                </Menu.Item>


                            </SubMenu>

                            <Menu.Item
                                key="/user"
                                icon={<TeamOutlined />}
                                onClick={() => history.push("/user")}>
                                Usuarios
                            </Menu.Item>

                            <Menu.Item
                                key="/chatbot"
                                icon={<WechatOutlined />}
                                onClick={() => history.push("/chatbot")}>
                                Chatbot
                            </Menu.Item>

                            <Menu.Item
                                key="/aditional-config"
                                icon={<SettingOutlined />}
                                onClick={() => history.push("/aditional-config")}>
                                Configuración adicional
                            </Menu.Item>

                            <Menu.Item
                                key="/notification"
                                icon={<NotificationOutlined />}
                                onClick={() => history.push("/notification")}>
                                Notificaciones
                            </Menu.Item>

                            <div className="menu-title">
                                <p>SOPORTE</p>
                            </div>

                            <SubMenu
                                key="support"
                                icon={<WhatsAppOutlined />}
                                title="Soporte"
                            >

                                <Menu.Item
                                    key="/support/callme"
                                    onClick={() => history.push("/support/callme")}
                                >
                                    · Solicitudes de llamada
                                </Menu.Item>

                                <Menu.Item
                                    key="/support/chat"
                                    onClick={() => history.push("/support/chat")}
                                >
                                    · Solicitudes de chat
                                </Menu.Item>


                            </SubMenu>

                        </Menu>
                        :
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[history.location.pathname]}
                            defaultOpenKeys={[history.location.pathname.split('/')[1]]}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <div className="menu-title">
                                <p>SOPORTE</p>
                            </div>

                            <SubMenu
                                key="support"
                                icon={<WhatsAppOutlined />}
                                title="Soporte"
                            >
                                <Menu.Item
                                    key="/website/comment"
                                    onClick={() => history.push("/website/comment")}
                                >
                                    · Comentarios
                                </Menu.Item>

                                <Menu.Item
                                    key="/support/callme"
                                    onClick={() => history.push("/support/callme")}
                                >
                                    · Solicitudes de llamada
                                </Menu.Item>

                                <Menu.Item
                                    key="/support/chat"
                                    onClick={() => history.push("/support/chat")}
                                >
                                    · Solicitudes de chat
                                </Menu.Item>


                            </SubMenu>

                        </Menu>
                    }




                </>
            </nav>
        </div>

        //     <div className="drawer">
        //         <div className="drawer-logo">
        //             <img src="/assets/logo/logo-white.svg" />
        //         </div>
        //         <nav>
        //             <ul>
        //                 {/*<li className="active">
        //                     <a href="/">
        //                         <img src="/assets/icon/home.svg" />
        //                         Inicio
        //                     </a>
        // </li>*/}
        //                 <li className="active">
        //                     <a href="/actor">
        //                         <TeamOutlined />
        //                         Actores
        //                     </a>
        //                 </li>
        //                 <li >
        //                     <a href="/category">
        //                         <AppstoreOutlined />
        //                         Categorías
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="/categoryquestion">
        //                         <AppstoreOutlined />
        //                         Categorías Pregunta
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="/internationalization">
        //                         <ZhihuOutlined />
        //                         Internacionalización
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="/notary">
        //                         <BankOutlined />
        //                         Notarias
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="/stateNotarial">
        //                         <FileProtectOutlined />
        //                         Estado Trámites
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="/subcategoryquestion">
        //                         <FileUnknownOutlined />
        //                         Subcategorías Pregunta
        //                     </a>
        //                 </li>
        //                 <li >
        //                     <a href="/user">
        //                         <UserOutlined />
        //                         Usuarios
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="/question">
        //                         <QuestionCircleOutlined />
        //                         Preguntas frecuentes
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="/page">
        //                         <ProfileOutlined />
        //                         Politicas y tratamiento de datos
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="/contact">
        //                         <IdcardOutlined />
        //                         Solicitudes de contacto
        //                     </a>
        //                 </li>
        //                 {/*<li>
        //                     <a>
        //                         <SolutionOutlined />
        //                         Mis trámites
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a>
        //                         <CommentOutlined />
        //                         Mensajes
        //                     </a>
        //                 </li>*/}
        //                 <li>
        //                     <a href="/notarialAct">
        //                         <FileDoneOutlined />
        //                         Actos Notariales
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="/banner">
        //                         <PictureOutlined/>
        //                         Banner
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="/comment">
        //                         <CommentOutlined/>
        //                         Comentarios
        //                     </a>
        //                 </li>
        //             </ul>
        //         </nav>
        //     </div>
    )
}

export default DrawerMenu