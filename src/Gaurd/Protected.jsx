import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ({children}) {
  return <>
  {
    localStorage.getItem("token") ? children: <Navigate to="/" />
  }
  
  
  </>
}
