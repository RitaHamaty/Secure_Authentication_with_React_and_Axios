import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

function Inputt(props) {

    const { name, label, msg, touched, ...rest } = props

    //console.log(touched)
    
    return (
        <Form.Group as={Col} >
            <Form.Label htmlFor={name}>{label}</Form.Label>
            <Control
                name={name}
                error={touched && msg}
                noerror={touched && !msg}
                {...rest}
            />
            <Msg error={touched && msg} noerror={touched && !msg}>{msg}</Msg>
        </Form.Group>
    )
}

export default Inputt

const Control = styled(Form.Control)`
    border:${props => props.error && "red 1px solid" };
    border:${props => props.noerror && "green 1px solid" };
`

const Msg = styled.p`
    color:${props => props.error && "red" };
    color:${props => props.noerror && "green" };
    margin-bottom: 0;
    font-size: 14px;
    margin-bottom: 8px;
`