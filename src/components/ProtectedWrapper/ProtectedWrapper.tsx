import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from 'src/contexts/UserContext'

export const ProtectedWrapper = ({children}:{children:React.ReactNode}) => {
  
    const navigate=useNavigate()
    const {isLoggedIn}=useUserContext()

    if(!isLoggedIn){
        navigate("/")
    }
    return (
    <div>{children}</div>
  )
}
