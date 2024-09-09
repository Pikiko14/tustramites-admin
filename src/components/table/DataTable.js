import React from 'react'
import { Table, Tag, Space } from 'antd';


const DataTable = ({ columns, data }) => {
    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default DataTable;
