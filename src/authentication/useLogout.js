import axios from '../api/axios'
import { useAuth } from './AuthTokenContext'
import { LOGOUT_URL } from '../api/urls';

const useLogout = () => {

    const { setAccess } = useAuth();

    const logout = async () => {
        setAccess(''); //empty the access

        try {
            res = await axios(LOGOUT_URL, {
                withCredentials: true
            })
        } catch (err) {
            console.log(err)
        }
    }

    logout();
}

export default useLogout