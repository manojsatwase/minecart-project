import React from 'react'
import Login from './Login'
import HomeProducts from './admin/HomeProducts'
import { useSelector } from 'react-redux'

const Home = () => {
  const isAuthenticated = useSelector(state=>state.userInfo.isAuthenticated);
  return (
    <>
      {!isAuthenticated && <Login />} 
      <HomeProducts />
    </>
  )
}

export default Home;