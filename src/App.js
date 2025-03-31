import {Route, Routes, BrowserRouter} from 'react-router-dom'
import './App.scss';
import {DashboardPage} from './pages/DashboardPage/index'
import {LoginPage} from './pages/LoginPage/index'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUser } from './store/authSlice/authSlice';

function App() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const dispatch = useDispatch()



  useEffect(()=> {
    const savedUser = localStorage.getItem('user')
    if (savedUser){
      dispatch(setUser(JSON.parse(savedUser)))
    }
    setIsAuthChecked(true);
  }, [dispatch])
  if (!isAuthChecked) return null;
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/dashboard' element={<DashboardPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
