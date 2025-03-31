import axios from "axios"
import { useState, useEffect, useRef } from "react"
import {setUser} from '../store/authSlice/authSlice'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { message } from "antd"


export const useAuth = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isMounted = useRef(true)

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    const login = async (username, password) => {
        setLoading(true);
        setError(null);
    
        try {
            const response = await axios.post('https://dummyjson.com/auth/login', {
                username,
                password,
            });
            dispatch(setUser(response.data));
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/dashboard');
        } catch (err) {
            console.error('Ошибка запроса:', err);
            const errorMessage = err.response?.data?.message || 'Ошибка аутентификации';
            setError(errorMessage);
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
 

    return { login, loading, error}
}




