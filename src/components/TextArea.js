import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';

function TextArea(props) {

    const { name, label, ...rest} = props
    return (
        <Form.Group as={Col} >
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Form.Control
            name={name}
            {...rest}
            as="textarea"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
            Please provide your first name
        </Form.Control.Feedback>
      </Form.Group>
    )
}

export default TextArea