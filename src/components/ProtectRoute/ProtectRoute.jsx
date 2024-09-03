import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRoute(props) {
    let nav=Navigate()
    if(localStorage.getItem('usertoken')){
        return props.children
    }else{
     <Navigate to={"/login"}/>
    }
  return (
    <div>
      
    </div>
  )
}
