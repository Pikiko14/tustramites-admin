import React, { useEffect, useState } from 'react'
import { Tabs, Button } from 'antd'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import ActionsMenu from './components/ActionsMenu'

// DIALOG
import SucursalDialog from './form/SucursalDialog'

// ICON
import {
    UndoOutlined
} from '@ant-design/icons'


const { TabPane } = Tabs;

const HomePage = () => {

    const [ loader, setLoader ] = useState(false);
    const [ dialogSucursal, setDialogSucursal ] = useState(false);

    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 3000);

    }, [])

    return (
        <>
        <SucursalDialog  
            visible={dialogSucursal}
            setVisible={setDialogSucursal}
        />
        <Layout loader={loader}>
            <div className="header-page">
                <h1>Sucursales</h1>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Lista Sucursales" key="1">
                        <div className="main-card card">
                            <div className="main-card-action">
                                <ul>
                                    <li>
                                        <Button 
                                            type="primary" 
                                            onClick={ () => setDialogSucursal(true) }
                                        >
                                            Agregar Sucursal
                                        </Button>
                                    </li>
                                    <li>
                                        <UndoOutlined />
                                    </li>
                                    <li>
                                        <ActionsMenu />
                                    </li>
                                </ul>
                            </div>
                            <div className="main-card-table">
                                <DataTable />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Configuración" key="2">
                   
                    </TabPane>
                    <TabPane tab="Seguridad" key="3">
                    
                    </TabPane>
                </Tabs>
            </div>
           
        </Layout>
        </>
    )
}

export default HomePage
