import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {
    if (localStorage.getItem('userLogin')) {

return props.Children
        
    }
    else{
        return<Navigate to={"/login"} />

    }

 
}
