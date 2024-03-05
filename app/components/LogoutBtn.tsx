"use client"
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const LogoutBtn = () => {
  return (  
    <Link onClick={() => signOut({callbackUrl: '/'})} href="api/auth/signout">Logout</Link>
  )
}

export default LogoutBtn