import {Form, Input, Button} from 'antd'
import './LoginPage.scss'
import {useAuth} from '../../../hooks/useAuth'
import { useEffect, useRef } from 'react'



const LoginPage = () => {
  const {login, error, loading} = useAuth()
  const isMounted = useRef(true)
 
useEffect(()=> {
  // Устанавливаем флаг isMounted в true при монтировании
  isMounted.current = true
  return () => {
    // При размонтировании компонента устанавливаем флаг в false
    isMounted.current = false;
  }  
}, [])

 const onFinish = async (values) => {
  console.log('onFinish → данные формы:', values);
  await login(values.username, values.password)
 }

  return (
    // <div className='login_container'>
    //   <h1>Вход</h1>
    //   <Form name='login' layout='vertical' onFinish={onFinish}>
    //     <Form.Item
    //       label='Имя пользователя'
    //       name='username'
    //       rules={[{required: true, message: 'Введите имя пользователя!'}]}
    //     >
    //       <Input autoComplete="username"/>
    //     </Form.Item>
    //     <Form.Item
    //       label="Пароль"
    //       name="password"
    //       rules={[{ required: true, message: 'Введите пароль!' }]}
    //     >
    //       <Input.Password autoComplete="current-password"/>
    //     </Form.Item>
    //     <Button type="primary" htmlType="submit" block loading={loading}>
    //         Войти
    //       </Button>
    //   </Form>
    //   {error && <p style={{color: 'red'}}>{error}</p>}
    // </div>
    <div className='login-page'>
      <div className="login-card">
        <h1>Вход</h1> 
        <Form name='login' layout='vertical' onFinish={onFinish}>
          <Form.Item
          label='Имя пользователя'
          name='username'
          rules={[{required: true, message: 'Введите имя пользователя!'}]}
        >
        <Input 
        autoComplete="username"/>
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password autoComplete="current-password"/>
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Войти
        </Button>
        </Form>
       {error && <p style={{color: 'red'}}>{error}</p>}
      </div>
    </div>
  )
}

export default LoginPage
