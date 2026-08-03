import React from 'react'
import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Products from './Products'
import Orders from '../DashBoard/Orders'



const Frontend = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="/order" element={<Orders />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default Frontend;