//this hook is for reusing the toast function
 
import { useState } from 'react';
import { toast } from 'react-toastify';

const useToast = () => {
    
    const [toastMessage, setToastMessage] = useState('');

    const showToastMessage = (message) => {
        setToastMessage(message);
        toast.success(message);
    };

    const showErrorMessage = (errorMessage) => {
        setToastMessage(errorMessage);
        toast.error(errorMessage);
    };

    return { showToastMessage, showErrorMessage, toastMessage };
};

export default useToast;