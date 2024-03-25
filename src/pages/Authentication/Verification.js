import { useState } from "react";
import Form from 'react-bootstrap/Form';
import FromControler from '../../components/FromControler';
import axios from "../../api/axios";
import StyledButton from "../../components/StyledButton";
import { useNavigate, useLocation } from 'react-router-dom'
import { StyledDiv2, VTitle, VerificationDiv, ErrorMsg } from '../../styles/Styles'
import useToast from "../../components/useToast";
import { motion } from "framer-motion";
import { VERIFICATION_URL, RESEND_CODE_URL } from "../../api/urls";

const Verification = () => {

    const navigate = useNavigate()

    const location = useLocation() 
    const emailFromReg = location.state

    const { showToastMessage, showErrorMessage } = useToast();

    const [ msg, setMsg ] = useState('')
    const [ verification, setVerification ] = useState({
        email: emailFromReg,
        otp: ''
    })

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        try{
            const res = await axios.post(VERIFICATION_URL, JSON.stringify(verification),{
                headers: { 'Content-Type': 'application/json'},
            } );

            console.log(res.data)

            setMsg(res.data.message)

            if(res.status === 200){
                showToastMessage(res.data.message)
                navigate('/login')
            }
        } catch (err) {
            setMsg(err);
            console.log(err);
            showErrorMessage('Something went wrong!');
        }
        // //no server
        //navigate('/login')
    };

    const handleOtpChange = (e) => {
        setVerification({
            ...verification,
            [e.target.name] : e.target.value
        })
    }

    const handleResendCode = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(RESEND_CODE_URL, JSON.stringify(verification.email),{
                headers: { 'Content-Type': 'application/json'},
            } );
            console.log(res.data);
            showToastMessage(res.data.message);

        } catch (err) {
            console.log(err)
            showErrorMessage("Something went wrong!");
        }
    }

    return (
        <StyledDiv2>
            <motion.div
            initial={{ x: 1200 }}
            animate={{ x: 0 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 50
                }}>
            <VerificationDiv className="p-5">
                <VTitle className="mb-4">Verification</VTitle>
                <Form onSubmit={handleOtpSubmit}>

                <p className="mb-4">Please provide the code we sent to your email to activate your account.</p>

                <FromControler name='otp' label='Enter the code:' control='input' type='text'
                    autoComplete='off' value={verification.otp} onChange={handleOtpChange} className='mb-3' />

                <ErrorMsg>{msg}</ErrorMsg>
                
                <div className="d-flex justify-content-center mt-4">
                    <StyledButton type='button' className='mt-4 mx-4' variant="secondary" onClick={handleResendCode}>Resend Code</StyledButton>
                    <StyledButton type='submit' className='mt-4 mx-4'>Confirm</StyledButton>
                </div>

                </Form>
            </VerificationDiv>
            </motion.div>
        </StyledDiv2>
    )
}

export default Verification;