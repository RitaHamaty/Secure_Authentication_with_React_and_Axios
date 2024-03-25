//this hook for attaching interceptors to this axios instance

import { useEffect } from 'react'
import { axiosPrivate } from './axios'
import { useAuth } from '../authentication/AuthTokenContext'
import useRefreshToken from '../authentication/useRefreshToken'

const useAxiosPrivate = () => {

    const refresh = useRefreshToken();

    const { access } = useAuth();

    //attach and remove interceptors
    useEffect(()=>{
        console.log("Interceptor setup triggered");

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers["Authorization"]){
                    config.headers["Authorization"] = `Bearer ${access}`;
                }
                console.log("Request interceptor:", config);
                return config;
            }, (error) => Promise.reject(error)
        )

        const responceIntercept = axiosPrivate.interceptors.response.use(
            response => response, //if the responce is good return it
            (error => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    console.log("Responce interceptor")
                    const newAccessToken = refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error)
            }) //access token expired
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responceIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);
        } //clean the interceptors
    }, [access, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate