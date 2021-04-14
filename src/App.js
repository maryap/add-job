import React from 'react'
import Form from './components/Form'
import Table from './components/Table'
import { connect } from 'react-redux'
import Modal from './components/Modal'

function App(props) {
    return (
        <div className="container">
            <div className="form-inner">
                <Form />
                {props.tableData.length > 0 ? <Table /> : null}
                {props.modal ? <Modal /> : null}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tableData: state.tableData,
        modal: state.modal
    }
}
export default connect(mapStateToProps)(App)
