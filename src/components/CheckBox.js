import React from 'react'
import Form from 'react-bootstrap/Form'

function CheckBox(props) {

    const { name, label, value, onChange, ...rest} = props
    
    return (
        <Form.Group className="mb-3 d-inline-flex">
            <Form.Check
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            {...rest}
            feedback="You must agree before submitting."
            feedbackType="invalid"
            />
        </Form.Group>
    )
}

export default CheckBox