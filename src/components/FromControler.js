import React from 'react'
import Inputt from './Inputt'
import CheckBox from './CheckBox'
import TextArea from './TextArea'
import Selectt from './Selectt'
import Radio from './Radio'

function FromControler(props) {

    const { control, ...rest} = props

    switch(control) {
        case 'input' : return <Inputt {...rest} />
        case 'textarea' : return <TextArea {...rest} />
        case 'select' : return <Selectt {...rest} />
        case 'checkbox' : return <CheckBox {...rest} />
        case 'radio' : return <Radio {...rest} />
    }
}

export default FromControler