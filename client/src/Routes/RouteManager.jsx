import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Cart from '../Pages/Cart'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import SingleProductPage from '../Pages/SingleProductPage'
import Checkout from '../Pages/Checkout'
import NotFound from '../Pages/NotFound.jsx'

function RouteManager() {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/product/:id' element={<SingleProductPage/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default RouteManager