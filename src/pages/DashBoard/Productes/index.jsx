import { Typography } from 'antd'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import All from './All'
import Add from './Add'

const Products = () => {
  return (
    <>
    <Routes>
      <Route index  element={<All/>} />
      <Route path='add'  element={<Add/>} />
    </Routes>
    </>
  )
}

export default Products