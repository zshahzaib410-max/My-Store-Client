import React from 'react'
import './App.scss'
import AppRoutes from './pages/AppRoutes'
import './config/global'
import { ConfigProvider } from 'antd'
import { useAuth } from './context/AuthContext'
import ScreenLoader from './components/Mics/ScreenLoader'

const App = () => {
  const {appLoading}=useAuth()
  return (
    <>
    <ConfigProvider theme={{token:{colorPrimary: '#id3557' }, components:{ Button:{ controlOutlineWidth:0 } }  }} >
      {appLoading ? <ScreenLoader/> : <AppRoutes/>}
    </ConfigProvider>
    </>
  )
}

export default App