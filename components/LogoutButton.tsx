"use client"

import React from 'react'
import { signOut } from 'next-auth/react'
import { Button } from './Button'
import { FaSignOutAlt } from "react-icons/fa";

export const LogoutButton = () => {
  return (
    <FaSignOutAlt className='text-white cursor-pointer hover:opacity-65 transition-opacity' onClick={()=> {
        signOut({
            callbackUrl: `${window.location.origin}/auth`,
            redirect: true
        })
    }}/>
  )
}
