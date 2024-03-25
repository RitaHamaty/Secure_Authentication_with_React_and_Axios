import { useState } from "react";
import FromControler from '../../components/FromControler';
import axios from "../../api/axios";
import { Form, Row } from "react-bootstrap";
import img from '../../assets/1.png'
import StyledButton from "../../components/StyledButton";
import { Link, useNavigate } from 'react-router-dom'
import { StyledDiv, FormDiv, StyledImg, Title, Styledspan, ImageCol, FormCol } from '../../styles/Styles'
import { motion } from "framer-motion";
import useToast from "../../components/useToast";
import { REGISTER_URL } from '../../api/urls'

const Register = () => {

    const navigate = useNavigate();

    const { showToastMessage, showErrorMessage } = useToast();

    const [ user, setUser ] = useState({
        email: '',
        password: '',
        password2: ''
    })

    const [emMsg, setemMsg] =  useState(''); 
    const [passMsg, setpassMsg] =  useState(''); 
    const [emailTouched, setEmailTouched] = useState(false)
    const [passTouched, setPassTouched] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(REGISTER_URL, JSON.stringify(user),{
                headers: { 'Content-Type': 'application/json'},
            });

            console.log(res)

            if(res.status === 200){
                showToastMessage(res.data.message);
                navigate('/verification', {state: user.email});
            }
            
        } catch(err) {
            setemMsg(err.response.data.email);
            setpassMsg(err.response.data.password);
            console.log(err.response.data);
            showErrorMessage('Something went wrong!');
        }

        // //no server
        //navigate('/verification', {state: user.email});
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }


    return (
        <StyledDiv>
            <Row className="h-100">
            <ImageCol className="p-0">
                <motion.div initial={{ x: -400 }} animate={{ x: 0 }} transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 50
                    }}>
                    <StyledImg src={img} />
                </motion.div>
                </ImageCol>
                
                <FormCol className="p-0">
                <motion.div initial={{ x: 400 }} animate={{ x: 0 }} transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 50
                    }}>
                <FormDiv className="py-5 px-4">
                    <Title>Welcome <Styledspan>User</Styledspan></Title>
                    <p>Create your account now with us...</p>

                    <Form onSubmit={handleSubmit} className="px-5">

                    <FromControler name='email' label='Email:' control='input' type='text'
                    autoComplete='off' value={user.username} msg={emMsg} touched={emailTouched} 
                    className='mb-3' onChange={handleChange} onBlur={e => setEmailTouched(true)}/>
                    
                    <FromControler name='password' label='Password:' control='input' type='password' 
                    autoComplete='off' value={user.password} msg={passMsg} touched={passTouched} 
                    className='mb-3'  onChange={handleChange} onBlur={e => setPassTouched(true)}/>

                    <FromControler name='password2' label='Confirm Password:' control='input' type='password' 
                    autoComplete='off' value={user.password2} msg={passMsg} touched={passTouched} 
                    className='mb-4' onChange={handleChange} onBlur={e => setPassTouched(true)} />

                    <p>Already have an account? <Link to='/login'>Login</Link></p>

                    <StyledButton type="submit" className="my-2 mx-4">Sign Up</StyledButton>
                    </Form>

                </FormDiv>
                </motion.div>
                </FormCol>
            </Row>
        </StyledDiv>
    )
}

export default Register