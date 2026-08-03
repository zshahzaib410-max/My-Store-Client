import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Products from './Productes'
import Users from './Users'
import Orders from './Orders'
import ProtectedRoutes from '@/components/Mics/ProtectedRoutes'

const DashBoardRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/orders' element={<ProtectedRoutes Component={Orders} allowedRoles={["superAdmin", "customer"]} />} />
      <Route path='/products/*' element={<ProtectedRoutes Component={Products} allowedRoles={["superAdmin"]} />} />
      <Route path='/users' element={<ProtectedRoutes Component={Users} allowedRoles={["superAdmin"]} />} />

    </Routes>
  )
}

export default DashBoardRoutes