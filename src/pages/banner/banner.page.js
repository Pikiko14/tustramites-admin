import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import BannerDialog from './components/BannerDialog'
import ActionTable from '../../components/table/ActionTable'
import Alert from '../../helpers/alert/Alert'

// ICON
import {
    UndoOutlined
} from '@ant-design/icons'

const Banner = () => {
    const [listBanners, setListBanners] = useState([]);
    const [bannerDialog, setBannerDialog] = useState();
    const [banner, setBanner] = useState();

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
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
                    handleEdit={() => handleEditBanner(record)}
                    handleDelete={() => alertShow(record)}
                />
            ),
        }
    ];

    const handleNewBanner = () => {
        setBanner(null);
        setBannerDialog({});
    }

    const handleEditBanner = (banner) => {
        setBanner(banner);
        setBannerDialog({ banner });
    }

    const alertShow = (banner) => {
        Alert.show({
            type: "warning",
            title: "Confirmación",
            message: "¿Seguro desea eliminar este banner?",
            btnOk: "Aceptar",
            fnOk: () => { deleteBanner(banner) },
            btnCancel: "Cancelar",
            fnCancel: () => {}
        })
    }

    const deleteBanner = async (banner) => {

        const response = await HttpClient.delete('/api/banner/' + banner._id);
        if (response.status == 200) {
            getBanners();
        }
    }

    const callbackBanner = () => {
        getBanners();
        setBannerDialog(null);
    }

    const getBanners = async () => {
        const response = await HttpClient.get('/api/banner/admin');
        if (response.status == 200) {
            setListBanners(response.data);
        }
    }

    useEffect(() => {
        getBanners();
    }, [])

    return (
        <>
            <BannerDialog
                banner={banner}
                data={bannerDialog}
                setData={setBannerDialog}
                callback={callbackBanner}
            />
            <Layout>
                <div className="header-page">
                    <h1>Banners</h1>

                    <div className="main-card card">
                        <div className="main-card-action">
                            <ul>
                                <li>
                                    <Button
                                        type="primary"
                                        onClick={() => handleNewBanner()}
                                    >
                                        Crear Banner
                                    </Button>
                                </li>
                                <li>
                                    <UndoOutlined />
                                </li>
                            </ul>
                        </div>
                        <div className="main-card-table">
                            <DataTable columns={columns} data={listBanners} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Banner
