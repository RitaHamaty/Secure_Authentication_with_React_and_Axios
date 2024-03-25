import React from 'react'
import Button from 'react-bootstrap/Button';

const StyledButton = (props) => {

    const {type, className, children, ...rest} = props

    return (
        <Button type={type} className={className} style={{width: '80%'}} {...rest} >{children}</Button>
    )
}

export default StyledButton