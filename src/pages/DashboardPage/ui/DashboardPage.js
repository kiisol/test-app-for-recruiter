import React, { useEffect } from 'react'
import {Card, Layout, Menu, Spin, Table} from 'antd'
import { useSelector} from 'react-redux'
import {useFetchUsers} from '../../../hooks/useFetchUsers'
import '../ui/DashboardPage.scss'
import { useNavigate } from 'react-router-dom'

const {Header, Content, Sider} = Layout

const DashboardPage = () => {
  const user = useSelector((state) => state.auth?.user)
  const users = useSelector((state) => state.auth?.users || [])
  const {loading, error} = useFetchUsers()
  const navigate = useNavigate()
  
  // Если пользователь не аутентифицирован
  useEffect(()=>{
    if (!user) {
      navigate('/');
    }
  }, [user, navigate])

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      key: 'age',
    }
  ]


  // Если user нет, не рендерим компонент
  if (!user) {
    return null;
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* <Sider  
      breakpoint="md"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log('mobile?', broken);
      }}
      >
        <div className="logo">Dashboard</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              label: 'Пользователи',
              onClick: () => navigate('/dashboard'),
            }
          ]}
        />  
      </Sider> */}
      <Layout>
        <Header className="header">
          <h1>Добро пожаловать, {user?.username}!</h1>
        </Header>
        <Content style={{ padding: '20px' }}>
          <div className="dashboard-content">
            <Card title="Данные пользователя" style={{ marginBottom: '20px' }}>
              <img
              src={user?.image}
              alt="Аватар"
              style={{ width: 50, height: 50, borderRadius: '5%'}}
              />
              <p>
                <strong>Имя:</strong> {user?.firstName} {user?.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p><strong>Пол:</strong> {user?.gender === 'female' ? 'Женский' : 'Мужской'}</p>
            </Card>
            <h2>Список пользователей</h2>
            {loading && <Spin />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ overflowX: 'auto' }}>
              <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardPage
