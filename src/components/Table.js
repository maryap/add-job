import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'

function Table(props) {
    const [searchTerm, setSearchTerm] = useState("")
    const [tableData, setTableData] = useState([])
    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }
    useEffect(() => {
        const results = props.tableData.filter(data =>
            data.job.toLowerCase().includes(searchTerm)
        )
        setTableData(results)
    }, [searchTerm, props.tableData])
    return (
        <div>
            <div className="table-header">
                <h1>Job list</h1>
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Search Job"
                    value={searchTerm}
                    onChange={handleChange} />
            </div>
            <table className="table table-hover">
                <tbody>
                    {tableData.map(item => (
                        <tr key={item.id} className={item.priority === 'urgent' ? 'red' : item.priority === 'regular' ? 'yellow' : 'blue'}>
                            <td className="first-column">{item.job}</td>
                            <td>{item.priority}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm table-buttons"
                                    onClick={() => props.onModalOpen(item)}>Edit</button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm table-buttons"
                                    onClick={() => props.onDelete(item)}>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        tableData: state.tableData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onModalOpen: (data) => {
            dispatch({
                type: actionTypes.MODAL_OPEN,
                data
            })
        },
        onDelete: (item) => {
            dispatch({
                type: actionTypes.DELETE,
                item
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Table)
