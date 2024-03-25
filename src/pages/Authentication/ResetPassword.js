import { useState } from "react";
import Form from 'react-bootstrap/Form';
import FromControler from '../../components/FromControler';
import axios from "../../api/axios";
import StyledButton from "../../components/StyledButton";
import { useNavigate } from 'react-router-dom';
import { StyledDiv2, VTitle, VerificationDiv } from '../../styles/Styles'
import { motion } from "framer-motion";
import useToast from "../../components/useToast";
import { REQUEST_URL, CODE_URL, NEW_PASSWORD_URL, RESEND_CODE_URL } from "../../api/urls";

const ResetPassword = () => {

    const { showToastMessage, showErrorMessage } = useToast();

    const navigate = useNavigate();

    const [ otp, setOtp ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ newpassword, setNewpassword ] = useState({
        email: email,
        new_password: '',
        re_password: ''
    });
    
    const [ step1, setStep1 ] = useState(true);
    const [ step2, setStep2 ] = useState(false);
    const [ step3, setStep3 ] = useState(false);

    const handleEmail = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(REQUEST_URL, JSON.stringify({email}),{
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.status === 200) {
                console.log(res.data);
                showToastMessage(res.data.success);
                setStep1(false)
                setStep2(true)
            }

        } catch (err) {
            console.log(err)
            console.log({email})
        }
    }

    const handleSubmitCode = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(CODE_URL, JSON.stringify({otp}),{
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(res.data)

            if (res.status === 200) {
                showToastMessage(res.data.message);
                setStep2(false)
                setStep3(true)
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(NEW_PASSWORD_URL, JSON.stringify(newpassword),{
                headers: { 'Content-Type': 'application/json'},
            } );
            console.log(res.data);

            if (res.status === 200) {
                showToastMessage(res.data.success);
                navigate('/login');
            }
        } catch (err) {
            console.log(err);
            showErrorMessage('Something went wrong! Please try again.');
        }
    }

    const handleChange = (e) => {
        setNewpassword({
            ...newpassword,
            [e.target.name] : e.target.value
        })
    }

    const handleResendCode = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(RESEND_CODE_URL, JSON.stringify({email}),{
                headers: { 'Content-Type': 'application/json'},
            } );

            console.log(res.data)
            showToastMessage('Success!')

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <StyledDiv2>
                {step1 &&
                <motion.div
                    initial={{ x: 1200 }}
                    animate={{ x: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 50
                    }}>
                <VerificationDiv className="py-5 px-5">
                <VTitle className="py-3 mb-3">Reset your password</VTitle>
                <Form onSubmit={handleEmail} className="px-4">
                    <p className="mb-4">Please provide your email...</p>
                    <FromControler name='email' label='Enter Your Email:' control='input' type='text'
                    autoComplete='off' value={email} onChange={e => setEmail(e.target.value)} 
                    className='mb-4 mt-1'/>
                    <div className=" d-flex justify-content-center mt-5">
                        <StyledButton type='submit'>Confirm</StyledButton>
                    </div>
                </Form>
                </VerificationDiv>
                </motion.div>}

                {step2 &&
                <motion.div
                    initial={{ x: 1200 }}
                    animate={{ x: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 50
                    }}>
                <VerificationDiv className="py-4 px-5">
                <VTitle className="py-3 mb-3">Reset your password</VTitle>
                <Form onSubmit={handleSubmitCode} >
                    <p className="mb-4">Please provide the code we sent to your email to reset your password</p>
                    <FromControler name='otp' label='Enter the code:' control='input' type='text'
                    autoComplete='off' value={otp} onChange={e => setOtp(e.target.value)} className='mb-3' />
                    <div className="d-flex justify-content-center mt-4">
                        <StyledButton type='button' className='mt-4 mx-4' variant="secondary" onClick={handleResendCode}>Resend Code</StyledButton>
                        <StyledButton type='submit' className='mt-4 mx-4'>Confirm</StyledButton>
                    </div>
                </Form>
                </VerificationDiv>
                </motion.div>}

                {step3 &&
                <motion.div
                    initial={{ x: 1200 }}
                    animate={{ x: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 50
                    }}>
                <VerificationDiv className="py-2 px-5">
                <VTitle className="py-3">Reset your password</VTitle>
                <Form onSubmit={handleResetPassword}>
                    <p>Please provide the new password</p>
                    <FromControler name='new_password' label='Enter new password:' control='input' type='text'
                    autoComplete='off' value={newpassword.new_password} onChange={handleChange} className='mb-3' />
                    <FromControler name='re_password' label='Enter new password again:' control='input' type='text'
                    autoComplete='off' value={newpassword.re_password} onChange={handleChange} className='mb-3' />
                    <div className=" d-flex justify-content-center">
                        <StyledButton type='submit' className='mt-4'>Reset</StyledButton>
                    </div>
                </Form>
                </VerificationDiv>
                </motion.div>}
        </StyledDiv2>
    )
}

export default ResetPassword