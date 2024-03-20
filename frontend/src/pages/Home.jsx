import React from 'react'
import Login from './Login'

import { useSelector } from 'react-redux'
import MainCarousel from '../components/MainCarousel'
import MainProducts from '../components/MainProducts'

const Home = () => {
  const isAuthenticated = useSelector(state=>state.userInfo.isAuthenticated);
  return (
    <>
      {!isAuthenticated && <Login />} 
      <MainCarousel />
      <MainProducts />
    </>
  )
}

export default Home;