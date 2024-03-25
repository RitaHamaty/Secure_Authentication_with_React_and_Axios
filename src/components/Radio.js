import React from 'react'
import Form from 'react-bootstrap/Form'

function Radio(props) {
    const { name, label, ...rest} = props
    return (
        <Form.Group className="mb-3">
            <Form.Check
            name={name}
            label={label}
            {...rest}
            feedback="You must agree before submitting."
            feedbackType="invalid"
            />
        </Form.Group>
    )
}

export default Radio