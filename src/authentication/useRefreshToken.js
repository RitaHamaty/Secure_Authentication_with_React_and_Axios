import { useAuth } from "./AuthTokenContext";
import { REFRESH_URL } from "../api/urls";
import axios from '../api/axios'

const useRefreshToken = () => {

    const { setAccess } = useAuth();

    const refreshFunc = async () => {

        //refresh end point
        const res = await axios.post(REFRESH_URL, {}, {
            withCredentials: true,
        });

        setAccess(res.data.access);

        //to get our token when using this function
        return res.data.access
    }

    return refreshFunc;
}

export default useRefreshToken