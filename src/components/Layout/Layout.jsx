import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Layout() {
  return (
   <>
    <Navbar/>
    <div className='conatiner1 py-20'>
<Outlet/> 


    </div>



    </>
  )
}
