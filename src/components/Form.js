import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import * as actionTypes from '../store/actions'
import { v4 as uuid } from 'uuid'
import { mockApi } from '../services/api'
import useFetch from '../hooks/useFetch'

function FormikContainer(props) {
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
        job: '',
        priority: ''
    }
    const validationSchema = Yup.object({
        job: Yup.string().required('Required!').matches(
            /^[a-zA-Z0]+$/,
            "Please only enter Latin alphabet characters."
        ),
        priority: Yup.string().required('Required!')
    })
    const onSubmit = values => {
        let data = JSON.parse(JSON.stringify(values))
        data = { ...data, id: uuid() }
        props.onSubmit(data)
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                formik => (
                    <Form>
                        <FormikControl
                            control='input'
                            type='text'
                            label='Job'
                            name='job'
                        />
                        <FormikControl
                            control='select'
                            label='Priority'
                            name='priority'
                            options={dropdownOptions}
                        />
                        <button type="submit" className="btn btn-success btn-sm">Submit</button>
                    </Form>
                )}
        </Formik>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (data) => {
            dispatch({
                type: actionTypes.TABLE_DATA,
                data
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(FormikContainer)
