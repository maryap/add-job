import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Select(props) {
    const { label, name, options, ...rest } = props
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field as="select" className="form-control form-control-sm" id={name} name={name} {...rest}>
                {options.map(option => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.key}
                        </option>
                    )
                })}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Select
