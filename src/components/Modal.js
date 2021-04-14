import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import * as actionTypes from '../store/actions'
import { mockApi } from '../services/api'
import useFetch from '../hooks/useFetch'

function Modal(props) {
    const [dropdownOptions, setDropdownOptions] = useState([])

    const { response, isLoading, error } = useFetch({
        api: mockApi,
        method: "get",
        url: "/Priority"
    })

    useEffect(() => {
        if (response !== null) {
            setDropdownOptions(response);
        }
    }, [response])

    const initialValues = {
        job: props.editData.job,
        priority: props.editData.priority,
        id: props.editData.id
    }
    const validationSchema = Yup.object({
        priority: Yup.string().required('Required!')
    })
    const onSubmit = values => {
        let data = JSON.parse(JSON.stringify(values))
        props.onEdit(data)
    }

    return (
        <>
            <div className="transparentBg" onClick={() => props.onModalClose()}></div>
            <div className="modal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{props.editData.job}</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => props.onModalClose()}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {
                                    formik => (
                                        <Form>
                                            <FormikControl
                                                control='select'
                                                label='Priority'
                                                name='priority'
                                                options={dropdownOptions}
                                            />
                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => props.onModalClose()}>Close</button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-sm">Save changes</button>
                                            </div>
                                        </Form>
                                    )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
const mapStateToProps = state => {
    return {
        editData: state.editData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onModalClose: () => {
            dispatch({
                type: actionTypes.MODAL_CLOSE
            })
        },
        onEdit: (item) => {
            dispatch({
                type: actionTypes.EDIT,
                item
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal)
