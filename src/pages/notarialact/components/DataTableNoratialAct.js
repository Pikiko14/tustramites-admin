import React from 'react'
import { Table, Tag, Space, Checkbox } from 'antd';
// ICON
import {
    DeleteOutlined
} from '@ant-design/icons'

const DataTableNoratialAct = ({ listActorsAdd, tableAux, setChecked,deleteInput }) => {

    return (
        <div >
            <table>
                <thead class="ant-table-thead">
                    <tr>
                        <th class="ant-table-cell">Campo</th>
                        {listActorsAdd.map((item, i) => (
                            <th class="ant-table-cell">{item.actor.name}</th>
                        ))}
                        <th width="10%" class="ant-table-cell">Acciones</th>
                    </tr>
                </thead>
                <tbody class="ant-table-tbody">
                    {tableAux ? (
                        <React.Fragment>
                            {Object.keys(tableAux).map((item, i) => (
                                <tr>
                                    <td class="ant-table-cell">{tableAux[item]['input']['name']}</td>
                                    {tableAux[item]['input']['actor'] ? (
                                        <React.Fragment>
                                            {Object.keys(tableAux[item]['actors']).map((child, j) => (
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => setChecked(item, child)}
                                                        defaultChecked={tableAux[item]['actors'][child]['checked']}
                                                    ></input>
                                                </td>
                                            ))}
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            {listActorsAdd.map((item, i) => (
                                                <td class="ant-table-cell">NA</td>
                                            ))}
                                        </React.Fragment>
                                    )}

                                    <td  className="btn-action ant-table-cell">
                                        <a className="action-delete" onClick={() => deleteInput(item, i)}>
                                            <DeleteOutlined />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ) : (
                        <tr>
                            <td colspan={3 + listActorsAdd.length} className="table-none">No hay actores agregados</td>
                        </tr>
                    )}
 
                </tbody>
            </table>
        </div>
    )
}

export default DataTableNoratialAct;
