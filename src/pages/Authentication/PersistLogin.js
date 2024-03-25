import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../authentication/useRefreshToken";
import { useAuth } from "../../authentication/AuthTokenContext";
import { Spinner } from "react-bootstrap";

const PersistLogin = () => {

    const [ isLoading, setIsLoading ] = useState(true);
    const refreshFunc = useRefreshToken();
    const { access } = useAuth();

    useEffect(() => {
        let isMounted = true;
        
        const verifyRefreshToken = async () => {
            try {
                await refreshFunc(); //sends cookie to the refresh end point and returns new access token 
            } catch (err) {
                console.log('error in presist login' + err)
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        !access ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false //clean up
    }, [])

    return (
        <>
            {isLoading ?
            <Spinner animation="border" variant="primary" /> :
            <Outlet/> }
        </>
    )
}

export default PersistLogin