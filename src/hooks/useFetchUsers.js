import axios from 'axios'
import { useEffect, useState,  } from 'react'
import { useDispatch } from 'react-redux'
import { setUsers } from '../store/authSlice/authSlice'

export const useFetchUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source()

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://dummyjson.com/users', {
          cancelToken: source.token,
        });
        if(isMounted) {
          dispatch(setUsers(response.data.users));
          setLoading(false);
        }
      } catch (err) {
        if(isMounted && !axios.isCancel(err)){
          setLoading(false);
          setError('Ошибка при загрузке пользователей');
        }
      } 
    };

    fetchUsers();
    return () => {
      isMounted = false
      source.cancel('Request canceled due to component unmount')
    }
  }, [dispatch]);

  return { loading, error };
};
// export const useFetchUsers = () => {
//   const [state, setState] = useState({
//     loading: false,
//     error: null
//   });
//   const dispatch = useDispatch();

//   useEffect(() => {
//     let isMounted = true;
//     const source = axios.CancelToken.source();

//     const fetchUsers = async () => {
//       if (!isMounted) return;
      
//       setState(prev => ({ ...prev, loading: true, error: null }));

//       try {
//         const response = await axios.get('https://dummyjson.com/users', {
//           cancelToken: source.token
//         });
        
//         if (isMounted) {
//           dispatch(setUsers(response.data.users));
//           setState(prev => ({ ...prev, loading: false }));
//         }
//       } catch (err) {
//         if (isMounted && !axios.isCancel(err)) {
//           setState(prev => ({
//             ...prev,
//             loading: false,
//             error: err.response?.data?.message || 'Ошибка при загрузке пользователей'
//           }));
//         }
//       }
//     };

//     fetchUsers();

//     return () => {
//       isMounted = false;
//       source.cancel('Компонент размонтирован, запрос отменен');
//     };
//   }, [dispatch]);

//   return state;
// };

