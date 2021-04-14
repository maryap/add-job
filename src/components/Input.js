import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Input(props) {
    const { label, name, ...rest } = props
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} className="form-control form-control-sm" {...rest} maxLength="70" />
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Input
