import React from 'react'
import Form from 'react-bootstrap/Form'

function Selectt(props) {

    const { name, label, options, onChange, value, ...rest} = props
    return (
        <Form.Group>
        <Form.Label htmlFor={name}>{label}</Form.Label>

        <Form.Select id={name} name={name} onChange={onChange} {...rest}>
        {
            options.map(o => { 
                return(
                <option key={o.value} value={o.value}>
                    {o.key}
                </option>)}
                )
        }
        </Form.Select>

        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            
        </Form.Group>
    )
}

export default Selectt