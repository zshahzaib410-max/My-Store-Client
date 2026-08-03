import NotFound from '@/components/Mics/NotFound'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import DashBoard from './DashBoard'
import ProtectedRoutes from '@/components/Mics/ProtectedRoutes'
import { useAuth } from '@/context/AuthContext'

const AppRoutes = () => {
  const { isAuth }=useAuth()
  return (
   <>
   <Routes>
    <Route path='/*' element={<Frontend/>} />
    <Route path='/auth/*' element={ !isAuth ? <Auth/> : <Navigate to='/dashboard' /> } />
    <Route path='/dashboard/*' element={< ProtectedRoutes Component={DashBoard} />} />
    <Route path='*' element={<NotFound/>} />
   </Routes>
   </>
  )
}

export default AppRoutes