import React , { useState } from 'react'
import { Form, Row } from 'react-bootstrap';
import FromControler from '../../components/FromControler';
import axios from "../../api/axios";
import { useAuth } from '../../authentication/AuthTokenContext';
import { Link, useNavigate } from 'react-router-dom';
import { StyledDiv, FormDiv, StyledImg, Title, FormCol, ImageCol } from '../../styles/Styles'
import img from '../../assets/1.png'
import StyledButton from "../../components/StyledButton";
import { motion } from "framer-motion";
import useToast from '../../components/useToast';
import { LOGIN_URL } from '../../api/urls';

const Login = () => {

    const navigate = useNavigate();

    const { showToastMessage, showErrorMessage } = useToast();

    const { setAccess, userType, setUserType } = useAuth();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [detailMsg, setDetailMsg] =  useState(''); 
    const [emailTouched, setEmailTouched] = useState(false)
    const [passTouched, setPassTouched] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();

            try{
                const res = await axios.post(LOGIN_URL, JSON.stringify(user),{
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                });

                setAccess(res.data.access);
                setUserType(res.data.type);

                if(res.status === 200){
                    showToastMessage(res.data.message);
                    userType === 'user' ? navigate('/landing') : navigate('/admin')
                }
                
            } catch (err) {
                console.log(err.response.data);
    
                if (err.response.status === 401) {
                    setDetailMsg(err.response.data.detail); //response from server-side
                } else {
                    showErrorMessage('Something went wrong!');
                }
            }
        // //no server
        // userType === 'user' ? navigate('/landing') : navigate('/admin')
    };


    const handleChange = (e) =>{
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
                    <StyledImg src={img}/>
                    </motion.div>
                </ImageCol>
                <FormCol className="p-0">
                <motion.div initial={{ x: 400 }} animate={{ x: 0 }} transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 50
                    }}>
                <FormDiv className="py-5 px-4">
                    <Title>Welcome User</Title>
                    <p>Log in so you can benefit from all services!</p>
                    <Form onSubmit={handleSubmit} className="px-5">

                        <FromControler name='email' label='Email:' control='input' type='text'
                        autoComplete='off' value={user.email} msg={detailMsg} touched={emailTouched}
                        onChange={handleChange} onBlur={ e => setEmailTouched(true)} className='mb-3'/>

                        <FromControler name='password' label='Password:' control='input' type='password'
                        autoComplete='off' value={user.password}  msg={detailMsg} touched={passTouched}
                        onChange={handleChange} onBlur={ e => setPassTouched(true)} className='mb-3'/>

                        <p className='mt-5'>Don't have an account? <Link to='/register'> Sign up</Link></p>
                        <p>Forgot passeord? <Link to='/resetpassword'> ResetPassword</Link></p>

                        <StyledButton type="submit" className="my-4 mx-4">Login</StyledButton>
                    </Form>
                </FormDiv>
                </motion.div>
                </FormCol>
            </Row>
        </StyledDiv>
    )
}

export default Login